import User from "@/models/User";
import Student from "@/models/Student";
import { generateStudentRoll } from "@/lib/idGenerator";
import { hashPassword } from "@/lib/hash";

interface CreateStudentData {
    username: string;
    email: string;
    password: string;
    classId: string;
}





export const createStudent = async (data: CreateStudentData) => {
    const hashed = await hashPassword(data.password);
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: hashed,
        role: "student",
    });

    const roll = await generateStudentRoll(data.classId);

    return await Student.create({
        userId: user._id,
        classId: data.classId,
        rollNumber: roll,
    });
};