import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// Mount specific routes
router.use("/auth", authRoutes); // Routes under /auth

export default router;
