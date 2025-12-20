// import express from "express";
// import { loginUser, registerUser, getUserData, getCars } from "../controllers/userController.js";
// import { protect } from '../middleware/auth.js';
// import { getUserCars } from "../controllers/userController.js"
// const userRouter = express.Router();

// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/data', protect, getUserData);
// userRouter.get('/cars', protect, getCars);
// userRouter.get('/cars', getUserCars);


// export default userRouter;
import express from "express";
import { 
    loginUser, 
    registerUser, 
    getUserData, 
    getCars, 
    getUserCars,
    bookCar,
    getMyBookings,
    cancelBooking 
} from "../controllers/userController.js";
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getUserCars);  // All cars (no auth needed for browsing)
userRouter.post('/book-car', protect, bookCar);
  // New booking route
userRouter.get('/bookings', protect, getMyBookings);
userRouter.post('/cancel-booking', protect, cancelBooking);
export default userRouter;
