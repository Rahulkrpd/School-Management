import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher extends Document {
    userId: mongoose.Types.ObjectId;
    teacherCode: string;
}

const schema = new Schema<ITeacher>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        teacherCode: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model("Teacher", schema);