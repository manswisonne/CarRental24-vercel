// 
import User from "../models/User.js";
import Car from "../models/Car.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Booking from "../models/Booking.js";  // ← bcryptjs (not bcrypt)
// import Car from "../models/Car.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');  // ← req.user.id
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({}).select('model year price image');
    res.json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUserCars = async (req, res) => {
    try {
        const cars = await Car.find({}).populate('owner', 'name email');
        res.json({success: true, cars});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};
export const bookCar = async (req, res) => {
    try {
        const { carId, pickupDate, returnDate } = req.body;
        const userId = req.user._id;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        if (!car.isAvailable) {
            return res.status(400).json({ success: false, message: "Car is not available" });
        }

        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));

        if (days <= 0) {
            return res.status(400).json({ success: false, message: "Invalid dates" });
        }
        const overlappingBooking = await Booking.findOne({
            car: carId,
            status: { $in: ['pending', 'confirmed'] },  // Only active bookings
            $or: [
                // New booking starts during existing booking
                { pickupDate: { $lte: pickup }, returnDate: { $gte: pickup } },
                // New booking ends during existing booking
                { pickupDate: { $lte: returnD }, returnDate: { $gte: returnD } },
                // New booking encompasses existing booking
                { pickupDate: { $gte: pickup }, returnDate: { $lte: returnD } }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({ 
                success: false, 
                message: "Car is already booked for these dates" 
            });
        }
        const totalPrice = car.pricePerDay * days;

        const booking = await Booking.create({
            car: carId,
            user: userId,
            owner: car.owner,
            pickupDate: pickup,
            returnDate: returnD,
            price: totalPrice,
            status: 'pending'
        });

        res.json({ success: true, message: "Booking created successfully", booking });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Add this function to get user's bookings
export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const bookings = await Booking.find({
         user: userId , 
        status:{$ne:'cancelled'}
        })
            .populate('car', 'brand model image pricePerDay')
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;
        
        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        
        // Check if booking belongs to the user
        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        
        // Update booking status to cancelled
        booking.status = 'cancelled';
        await booking.save();
        
        res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};