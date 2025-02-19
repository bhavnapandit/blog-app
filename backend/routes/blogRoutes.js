import express from "express";
import { getAllBlogs,addBlog, updateBlog } from "../controllers/blogController.js"

const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.delete("/delete",)
blogRouter.get("/:id")

export default blogRouter;