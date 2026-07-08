import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async(req,res,next) => {
  try {
    //get token
    const token = req.header("Authorization").replace("Bearer ","");
    if(!token) return res.status(401).json({ message: "No authorizaton token, access denied" })

    //vertify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user 
    const user = await User.findById(decoded.userId).select("-password");

    if(!user) return res.status(401).json({ message: "Token is not valid" });


    // i think i have to delete this next function cuz it previosly caused an error
    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication error", error)
    res.status(401).json({ message: "Token is not valid" })
  }
} 

export default protectRoute;