import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinaryV2 from "../config/cloudinary.js";

//Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;

    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();

    res.send({ success: true });
  } catch (error) {
    console.error("Error creating the user");
    res.status(500).json({ success: false, error: error.message });
  }
};
//Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched || !user)
      return res.status(400).send({
        success: false,
        error: "Email or password is wrong",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({ success: true, token, user });
  } catch (error) {
    console.log("Error sign in:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//logged user
export const loggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.log("Error logged user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//find a user
export const findUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).send({ success: true, user });
  } catch (error) {
    console.error("Error finding the user", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//find by username
export const findUserByEmail = async (req, res) => {
  const username = req.params.username;
  try {
    const users = await User.find({
      username: { $regex: new RegExp(username, "i") },
    });

    res.status(200).send({ success: true, users });
  } catch (error) {
    console.error("Error finding users by username:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update profile Image
export const updateProfileImage = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user.profileImage) {
      const filename = user.profileImage.split("/").pop();
      const publicId = filename.split(".")[0];
      if (publicId) {
        cloudinaryV2.uploader
          .destroy(`Chatify_live_chat_mobile/profile_images/${publicId}`)
          .then((result) =>
            console.log("Old profile image deleted result:", result)
          );
      }
    }
    req.body.profileImage = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "User not found" });
    }

    console.log("Profile pic updated successfully:", updatedUser.profileImage);
    res.send({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating the profile pic", error.message);
  }
};

// Update username
export const updateUsername = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.username = req.body.username;

    await user.save();

    res.send({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating the username", error.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
};
