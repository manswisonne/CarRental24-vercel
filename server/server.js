import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import stripeRoutes from './routes/stripeRoutes.js';


console.log("IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY ? "exists" : "missing");
console.log("IMAGEKIT_URL_ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT);
// intialize express app
const app = express()
// connect database
await connectDB()
// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>res.send('server is running'))

app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/stripe', stripeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
