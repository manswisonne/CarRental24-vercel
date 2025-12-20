import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"});
        res.json({success: true, message: "now you can list cars"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const carData = JSON.parse(req.body.carData);
        const imageFile = req.file;
        
        let optimizedImageURL;
        
        // If image file is uploaded, use ImageKit
        if (imageFile) {
            const uploadResponse = await imagekit.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
                folder: '/cars'
            });
            
            optimizedImageURL = imagekit.url({
                path: uploadResponse.filePath,
                transformation: [
                    {width: 1280},
                    {quality: 'auto'},
                    {format: 'webp'}
                ]
            });
        } else {
            // Fallback: Use placeholder for testing
            optimizedImageURL = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800";
        }
        
        await Car.create({...carData, owner: _id, image: optimizedImageURL});
        res.json({success: true, message: "car added"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// api to list owner cars
export const getOwnerCars = async (req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id});
        res.json({success: true, cars});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// api to toggle car availability
export const toggleCarAvailabilty = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if (!car) {
            return res.json({success: false, message: "car not found"});
        }

        // checking if car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "unauthorized"});
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        res.json({success: true, message: "availability toggled"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// api to delete a car
export const deleteCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if (!car) {
            return res.json({success: false, message: "car not found"});
        }

        // checking if car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "unauthorized"});
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();

        res.json({success: true, message: "car removed"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// api to create dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;
        if (role !== 'owner') {
            return res.json({success: false, message: "unauthorised"});
        }

        const cars = await Car.find({owner: _id});
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1});
        const pendingBookings = await Booking.find({owner: _id, status: "pending"});
        const completedBookings = await Booking.find({owner: _id, status: "confirmed"});

        // calculate monthly revenue from bookings where status is confirmed
        const monthlyRevenue = bookings
            .filter(booking => booking.status === 'confirmed')
            .reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        };

        res.json({success: true, dashboardData});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({}).populate('owner', 'name email');
        res.json({success: true, cars});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};