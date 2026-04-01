import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
    classNo: number;
    section: string;
    teacherIds: mongoose.Types.ObjectId[];
}

const schema = new Schema<IClass>(
    {
        classNo: { type: Number, required: true },
        section: { type: String, required: true },
        teacherIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export default mongoose.models.Class || mongoose.model("Class", schema);