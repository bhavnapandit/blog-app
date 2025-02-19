import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog",blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.8cjrn.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("Database connection error:", err));

