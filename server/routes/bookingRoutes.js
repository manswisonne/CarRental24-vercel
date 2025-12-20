// 
import express from "express";
import { 
    checkAvailabilityOfCar,  // Updated name
    createBooking, 
    getUserBookings, 
    getOwnerBookings, 
    changeBookingStatus 
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar);
bookingRouter.post('/', protect, createBooking); // Changed from '/create'
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;

