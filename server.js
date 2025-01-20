// server.js
import express from "express";
import routes from "./src/routes/index.js";
import { connectDB } from "./src/db/index.js";

const app = express();
const PORT = 9000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
