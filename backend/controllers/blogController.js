import Blog from "../model/Blog.js";
import User from "../model/User.js";
import { mongoose } from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        res.status(404).json({ message: "No blog found!!" })
    }

    return res.status(200).json({ blogs });

}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User not found" })
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ blog });
}
export const updateBlog = async (req, res, next) => {
    const { title, description,image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({ message: "No blog found!!" })
    }

    return res.status(200).json({ blog })
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to delete the blog" })
    }

    return res.status(200).json({ blog })
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No blog found!!" })
    }
    return res.status(200).json({ blogs: userBlogs });
}

