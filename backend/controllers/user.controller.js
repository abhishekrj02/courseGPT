import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
    secure: true,
};
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new AppError("All fields are required", 400));
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return next(new AppError("Email already registered", 400));

        // Create new user
        const user = await User.create({ name, email, password });

        if (!user) {
            return next(new AppError("Registration failed", 500));
        }

        await user.save();

        user.password = undefined;
        const token = await user.generateJWTToken();
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered",
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("Username and password is required", 400));
        }
        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).json({ message: "Email doesn't exists" });

        // Check password
        if (!(await user.comparePassword(password))) {
            return next(new AppError("Email and Password doesnt match", 400));
        }
        // Generate JWT token
        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const logout = (req, res, next) => {
    if (req) {
        console.log("yes1");
        if (req.cookies) {
            console.log("yes2");
            if (req.cookies.token) console.log("yes3");
        }
    }

    if (!req.cookies || !req.cookies.token) {
        return next(new AppError("User not logged in", 400));
    }
    res.cookie("token", null, {
        secure: true,
        maxAge: 0,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};
export { register, login, logout };
