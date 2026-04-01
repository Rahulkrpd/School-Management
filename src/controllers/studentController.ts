import User from "@/models/User";
import Student from "@/models/Student";
import { generateStudentRoll } from "@/lib/idGenerator";

export const createStudent = async (data: any) => {
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: "student",
    });

    const roll = await generateStudentRoll(data.classId);

    return await Student.create({
        userId: user._id,
        classId: data.classId,
        rollNumber: roll,
    });
};