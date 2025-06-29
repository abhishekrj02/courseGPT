import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is reqiured"],
            minLength: [5, "Name should atleast be 5 chars"],
            maxLength: [50, "Name is too long"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is reqiured"],
            lowercase: true,
            trim: true,
            unique: true,
            match: [
                /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Too short"],
            select: false,
        },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
};

UserSchema.methods.generateJWTToken = async function () {
    return await jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );
};
const User = model('User', UserSchema);
export default User;