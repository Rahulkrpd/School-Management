import mongoose, { Schema, Document } from "mongoose";
import User from "./User";

export interface IClass extends Document {
    classNo: number;
    section: string;
    teacherIds: mongoose.Types.ObjectId[];
    studentIds: mongoose.Types.ObjectId[];
}

const schema = new Schema<IClass>(
    {
        classNo: { type: Number, required: true },
        section: { type: String, required: true },
        teacherIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
        studentIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

schema.pre("save", async function () {
    const UserModel = User;

    if (this.isModified("teacherIds")) {
        const teachers = await UserModel.find({
            _id: { $in: this.teacherIds },
            role: "teacher"
        });

        if (teachers.length !== this.teacherIds.length) {
            throw new Error("All teacherIds must have role 'teacher'");
        }
    }

    if (this.isModified("studentIds")) {
        const students = await UserModel.find({
            _id: { $in: this.studentIds },
            role: "student"
        });

        if (students.length !== this.studentIds.length) {
            throw new Error("All studentIds must have role 'student'");
        }
    }
});



export default mongoose.models.Class || mongoose.model("Class", schema);