import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Register a new user
//@routes POST /api/user
//@access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email }); //Our User model method to find one doc by email
    if (userExists) {
      res.status(400); //bad request as user already there
      res.json({
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201); //created status
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      res.json({ message: "Invalid user data" });
    }
  } catch (error) {
    //throw new Error("Invalid email or password");
    //handle
  }
};

//@desc Auth user & get token
//@routes POST /api/user/login
//@access Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); //Our User model method to find one doc by email
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      //throw new Error("Invalid email or password");
      res.json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    //throw new Error("Invalid email or password");
    //handle
  }
};

//@desc GET user profile
//@routes POST /api/user/profile
//@access Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); //await is mendate for all the DB calls
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404); //404 - user not found!
      res.json({ message: "User not found" });
    }
  } catch (error) {
    //throw new Error(""User not found"");
    //handle
  }
};

export { authUser, getUserProfile, registerUser };
