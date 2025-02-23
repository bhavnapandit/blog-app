import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes.js";
import router from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog",blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.8cjrn.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((err) => console.log("Database connection error:", err));

