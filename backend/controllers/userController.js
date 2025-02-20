import User from "../model/User.js"
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();

    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
}

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        const user = new User({
            name,
            email,
            password: hashPassword,
            blogs: []
        });

        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Try signing up first!!" });
        }

        const isPassword = bcrypt.compareSync(password, user.password);
        if (!isPassword) {
            return res.status(400).jason({ message: "Password is incorrect" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
    }
}

