import { createUserAccount } from "../services/auth.services.js";
import Joi from "joi";

const userAccountSchema = Joi.object({
  profile: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    usertype: Joi.string().valid("Admin", "User", "Supervisor","SuperAdmin").required(),
    photo: Joi.string().optional(), // URL or base64 string
    password: Joi.string().required(),
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

export const registerUser = async (req, res) => {
    console.log("register me baby")
  const { error } = userAccountSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const result = await createUserAccount(req.body);

  if (result.success) {
    return res
      .status(201)
      .json({
        message: "User account created successfully!",
        userAccount: result.userAccount,
      });
  } else {
    return res.status(500).json({ message: result.error });
  }
};
