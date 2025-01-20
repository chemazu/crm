import express from "express";
import Joi from "joi";
// import UserAccount from "./models/userAccount.model.js"; // path to your UserAccount model


const router = express.Router();

// Joi validation schema for the user account
const userAccountSchema = Joi.object({
  profile: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    usertype: Joi.string().valid("Admin", "User", "Supervisor").required(),
    photo: Joi.string().optional(), // URL or base64 string
  }).required(),
  employeeInfo: Joi.object({
    status: Joi.string().valid("Active", "Inactive").required(),
    title: Joi.string().default("Officer"),
    workPhone: Joi.string().optional(),
    department: Joi.string().default("Commercial Services"),
    mobile: Joi.string().optional(),
    reportsTo: Joi.string().optional(),
    otherPhone: Joi.string().optional(),
    fax: Joi.string().optional(),
    homePhone: Joi.string().optional(),
    imType: Joi.string().optional(),
    imName: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      postalCode: Joi.string().optional(),
      country: Joi.string().optional(),
    }).optional(),
    description: Joi.string().optional(),
  }).required(),
  settings: Joi.object({
    dateSettings: Joi.object({
      timezone: Joi.string().default("UTC"),
      dateFormat: Joi.string().default("YYYY-MM-DD"),
    }).optional(),
    layoutSettings: Joi.object({
      theme: Joi.string().valid("light", "dark").default("light"),
      language: Joi.string().default("en"),
    }).optional(),
    customSettings: Joi.object({
      notifications: Joi.boolean().default(true),
      emailUpdates: Joi.boolean().default(true),
    }).optional(),
  }).optional(),
});

// POST endpoint to create a new user account
export const createUserAccount = async (req, res) => {
  console.log("first");
};
//    {
//   // Validate the incoming request body using Joi
//   const { error } = userAccountSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   try {
//     // Create a new user account document in the database
//     const userAccount = new UserAccount(req.body);
//     await userAccount.save();
//     res
//       .status(201)
//       .json({ message: "User account created successfully!", userAccount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export default router;
