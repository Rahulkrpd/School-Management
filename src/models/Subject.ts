import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
    name: string;
    classId: mongoose.Types.ObjectId;
    teacherId: mongoose.Types.ObjectId;
}

const schema = new Schema<ISubject>(
    {
        name: { type: String, required: true },
        classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Subject || mongoose.model("Subject", schema);