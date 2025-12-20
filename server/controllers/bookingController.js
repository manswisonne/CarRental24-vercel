// 
import Booking from "../models/Booking.js";
import Car from "../models/Car.js"; // FIXED: Added .js

// Helper function to check availability of a specific car
// const checkCarAvailability = async (carId, pickupDate, returnDate) => { // RENAMED
//     try {
//         const bookings = await Booking.find({
//             car: carId,
//             pickupDate: { $lte: returnDate },
//             returnDate: { $gte: pickupDate },
//             status: { $ne: 'cancelled' } // Don't count cancelled bookings
//         });
//         return bookings.length === 0;
//     } catch (error) {
//         console.error("Check car availability error:", error);
//         return false;
//     }
// }
const checkCarAvailability = async (carId, pickupDate, returnDate) => {
  try {
    const pick = new Date(pickupDate)
    const ret = new Date(returnDate)

    const bookings = await Booking.find({
      car: carId,
      status: { $ne: 'cancelled' },
      pickupDate: { $lte: ret },
      returnDate: { $gte: pick }
    })

    return bookings.length === 0
  } catch (err) {
    console.error(err)
    return false
  }
}

// Availability of cars for the given date and location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        
        if (!location || !pickupDate || !returnDate) {
            return res.status(400).json({
                success: false,
                message: "Location, pickupDate, and returnDate are required"
            });
        }
        
        // Fetch all available cars for the given location
        const cars = await Car.find({ 
            location, 
            isAvailable: true 
        });
        
        console.log(`Found ${cars.length} cars in ${location}`);

        // Check car availability using promises
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkCarAvailability(car._id, pickupDate, returnDate);
            return {
                ...car._doc,
                isAvailable: isAvailable
            };
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);

        console.log(`Available cars: ${availableCars.length}`);

        res.json({
            success: true,
            availableCars,
            count: availableCars.length
        });
    } catch (error) {
        console.error("Check availability error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error checking availability"
        });
    }
}

// API to create booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;
        
        // Validation
        if (!car || !pickupDate || !returnDate) {
            return res.status(400).json({
                success: false,
                message: "Car, pickupDate, and returnDate are required"
            });
        }
        
        // Check if car exists and is available
        const carData = await Car.findById(car);
        if (!carData) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }
        
        if (!carData.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Car is not available for booking"
            });
        }
        
        // Check availability for dates
        // const isAvailable = await checkCarAvailability(car, pickupDate, returnDate);
        // if (!isAvailable) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Car is not available for selected dates"
        //     });
        // }
        const conflictingBooking = await Booking.findOne({
  car,
  status: { $ne: 'cancelled' },
  pickupDate: { $lte: new Date(returnDate) },
  returnDate: { $gte: new Date(pickupDate) }
});

if (conflictingBooking) {
  return res.status(400).json({
    success: false,
    message: "Car already booked for selected dates"
  });
}

        // Calculate price based on pickup and return
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        
        if (noOfDays < 1) {
            return res.status(400).json({
                success: false,
                message: "Return date must be after pickup date"
            });
        }
        
        const price = carData.pricePerDay * noOfDays;
        
        // Create booking
        const booking = await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price,
            status: 'confirmed' // Default status
        });
        
        res.json({
            success: true,
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error("Create booking error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error creating booking"
        });
    }
}

// API to list user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id })
            .populate("car")
            .sort({ createdAt: -1 }); // FIXED: toSorted() -> sort()
        
        res.json({
            success: true,
            bookings,
            count: bookings.length
        });
    } catch (error) {
        console.error("Get user bookings error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error fetching bookings"
        });
    }
}

// API to get owner bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Owner access required"
            });
        }
        
        const bookings = await Booking.find({ owner: req.user._id }) // FIXED: reqq.user_id -> req.user._id
            .populate('car')
            .populate('user', '-password') // Exclude password
            .sort({ createdAt: -1 }); // FIXED: toSorted() -> sort()
        
        res.json({
            success: true,
            bookings,
            count: bookings.length
        });
    } catch (error) {
        console.error("Get owner bookings error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error fetching owner bookings"
        });
    }
}

// API to change the booking status
// export const changeBookingStatus = async (req, res) => {
//     try {
//         const { _id } = req.user;
//         const { bookingId, status } = req.body;
        
//         if (!bookingId || !status) {
//             return res.status(400).json({
//                 success: false,
//                 message: "bookingId and status are required"
//             });
//         }
        
//         const booking = await Booking.findById(bookingId);
//         if (!booking) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Booking not found"
//             });
//         }
        
//         // Check if user is the owner of the car
//         if (booking.owner.toString() !== _id.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Not authorized to update this booking"
//             });
//         }
        
//         // Update status
//         booking.status = status;
//         await booking.save();
        
//         res.json({
//             success: true,
//             message: "Booking status updated successfully",
//             booking
//         });
//     } catch (error) {
//         console.error("Change booking status error:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server error updating booking status"
//         });
//     }
// }
// API to change the booking status - UPDATED
// export const changeBookingStatus = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     const { bookingId, status } = req.body;
    
//     if (!bookingId || !status) {
//       return res.status(400).json({
//         success: false,
//         message: "bookingId and status are required"
//       });
//     }
    
//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found"
//       });
//     }
    
//     // Check authorization
//     const isOwner = booking.owner.toString() === _id.toString();
//     const isUser = booking.user.toString() === _id.toString();
    
//     // If user is trying to cancel their own booking
//     if (isUser && status === 'cancelled') {
//       booking.status = 'cancelled';
//       await booking.save();
      
//       return res.json({
//         success: true,
//         message: "Booking cancelled successfully",
//         booking
//       });
//     }
    
//     // Owners can change any status
//     if (isOwner) {
//       booking.status = status;
//       await booking.save();
      
//       return res.json({
//         success: true,
//         message: "Booking status updated successfully",
//         booking
//       });
//     }
    
//     // If not authorized
//     return res.status(403).json({
//       success: false,
//       message: "Not authorized to update this booking"
//     });
    
//   } catch (error) {
//     console.error("Change booking status error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error updating booking status"
//     });
//   }
// }
export const changeBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { _id } = req.user;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const isOwner = booking.owner.toString() === _id.toString();
    const isUser = booking.user.toString() === _id.toString();

    if (status === 'cancelled' && isUser) {
      booking.status = 'cancelled';
      await booking.save();
      return res.json({ success: true, booking });
    }

    if (isOwner) {
      booking.status = status;
      await booking.save();
      return res.json({ success: true, booking });
    }

    return res.status(403).json({
      success: false,
      message: "Not authorized"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking"
    });
  }
};
