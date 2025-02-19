import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.8cjrn.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("Database connection error:", err));

