import UserAccount from "../models/userAccount.model.js" // path to your UserAccount model
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

// Secret for signing JWT
const JWT_SECRET = process.env.JWT_SECRET;

export const createUserAccount = async (body) => {
  try {
    const { profile } = body; // Extract profile from body
    const { email, password } = profile; // Extract email and password from profile

    // Check if email or password is missing
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace the plain password with the hashed password in the profile
    profile.password = hashedPassword;

    // Create a new user account document in the database
    const userAccount = new UserAccount({ ...body, profile });
    await userAccount.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: userAccount._id, email: userAccount.profile.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    return {
      success: true,
      userAccount,
      token, // Return the token along with the user account
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal server error" }; // Return an error message
  }
};

// GET endpoint to read a user account by ID
export const getUserAccount = async (req, res) => {
  try {
    const userAccount = await UserAccount.findById(req.params.id);
    if (!userAccount) {
      return res.status(404).json({ message: "User account not found" });
    }
    res.status(200).json(userAccount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT endpoint to update a user account by ID
export const updateUserAccount = async (req, res) => {
  // const { error } = userAccountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userAccount = await UserAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!userAccount) {
      return res.status(404).json({ message: "User account not found" });
    }
    res
      .status(200)
      .json({ message: "User account updated successfully!", userAccount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE endpoint to delete a user account by ID
export const deleteUserAccount = async (req, res) => {
  try {
    const userAccount = await UserAccount.findByIdAndDelete(req.params.id);
    if (!userAccount) {
      return res.status(404).json({ message: "User account not found" });
    }
    res.status(200).json({ message: "User account deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
