import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") //this Bearer string is for the naming convention before the token value
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); //check why we are doing -selected passowrd?
        next(); //will call next method passed in the route i.e, controller method
      } catch (error) {
        res.status(401);
        //throw new Error('Not authorized, token failed');
        res.json({ message: "Not authorized, token failed" });
      }
    }
    if (!token) {
      res.status(401);
      //throw new Error("Not authorized, no token");
      res.json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    //handle
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    res.json({ message: "Not authorized as admin" });
  }
};

export { protect, admin };
