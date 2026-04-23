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

schema.pre("save", async function () {
    const user = await mongoose.model("User").findById(this.userId);

    if (!user || user.role !== "student") {
        throw new Error("User must have role 'student'");
    }
});

schema.index({ classId: 1, rollNumber: 1 }, { unique: true }); 
export default mongoose.models.Student || mongoose.model("Student", schema);