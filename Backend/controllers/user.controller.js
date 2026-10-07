import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { log } from "console";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
   
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let profilePhoto = "";

    if(req.file){
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
      profilePhoto = cloudResponse.secure_url;
    }


    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
        profilePhoto: profilePhoto,
      },
    });
    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // check user's role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with this role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullname: user.fullname,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, email, bio, skills } = req.body;

    // cloudinary will updated here later
    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const skillsArray = skills.split(",");

    const userId = req.id; // middleware authentication will set the user id in req.id
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (email) user.email = email;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later, so we will update it later
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //saves the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //saves the original file name
    }

    await user.save();
    user = {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullname: user.fullname,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Catch error");
    
    console.log(error);
  }
};
