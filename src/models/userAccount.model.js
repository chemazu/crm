import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema(
  {
    profile: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      usertype: {
        type: String,
        enum: ["Admin", "User", "Supervisor"],
        required: true,
      },
      photo: { type: String }, // URL or base64 string for the photo
    },
    employeeInfo: {
      status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
      },
      title: {
        type: String,
        default: "Officer",
      },
      workPhone: { type: String },
      department: { type: String, default: "Commercial Services" },
      mobile: { type: String },
      reportsTo: { type: String },
      otherPhone: { type: String },
      fax: { type: String },
      homePhone: { type: String },
      imType: { type: String }, // Instant Messaging type
      imName: { type: String },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
      },
      description: { type: String },
    },
    settings: {
      dateSettings: {
        timezone: { type: String, default: "UTC" },
        dateFormat: { type: String, default: "YYYY-MM-DD" },
      },
      layoutSettings: {
        theme: { type: String, enum: ["light", "dark"], default: "light" },
        language: { type: String, default: "en" },
      },
      customSettings: {
        notifications: { type: Boolean, default: true },
        emailUpdates: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = UserAccount;
