import mongoose, { Schema } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "principal" | "teacher" | "student";

}

const schema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["principal", "teacher", "student","admin"],
        required: true
    }

}, { timestamps: true })



export default mongoose.models.User || mongoose.model("User", schema);