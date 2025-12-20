import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("=== PROTECT MIDDLEWARE ===");
    console.log("authHeader:", authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("FAILED: No Bearer token");
        return res.json({ success: false, message: "not authorised - no token" });
    }

    try {
        const token = authHeader.split(' ')[1];
        console.log("token:", token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:", decoded);
        
        if (!decoded || !decoded.id) {
            console.log("FAILED: No decoded.id");
            return res.json({ success: false, message: "not authorised - invalid decoded" });
        }

        req.user = await User.findById(decoded.id).select("-password");
        console.log("user found:", req.user);
        
        if (!req.user) {
            console.log("FAILED: User not found in DB");
            return res.json({ success: false, message: "user not found" });
        }

        console.log("SUCCESS: Calling next()");
        next();

    } catch (error) {
        console.log("FAILED: Error -", error.message);
        return res.json({ success: false, message: "not authorised - " + error.message });
    }
};