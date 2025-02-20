import express from "express";
import { getAllBlogs,addBlog, updateBlog, getById, deleteBlog, getByUserId } from "../controllers/blogController.js"

const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/:id",getById)
blogRouter.get("/user/:id",getByUserId)

export default blogRouter;