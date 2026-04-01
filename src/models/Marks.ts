import mongoose, { Schema, Document } from "mongoose";

export interface IMarks extends Document {
    studentId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    exam: string;
    marks: number;
}

const schema = new Schema<IMarks>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
        subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
        exam: { type: String, required: true },
        marks: { type: Number, min: 0, max: 100, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Marks || mongoose.model("Marks", schema);