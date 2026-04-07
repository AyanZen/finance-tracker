import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async ( req, res, next ) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                message:"Not authorized, no token",
                success:false,
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id).select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message: "User Not Found"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Not authorized, token failed",
            success:false,
        })
    }
}

export default protect;