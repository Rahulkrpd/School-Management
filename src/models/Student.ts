import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    userId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    rollNumber: string;
}

const schema = new Schema<IStudent>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
        rollNumber: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.models.Student || mongoose.model("Student", schema);