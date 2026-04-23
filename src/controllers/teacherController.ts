import User from "@/models/User";
import Teachers from "@/models/Teachers";
import { generateTeacherCode } from "@/lib/idGenerator";

interface TeacherData {
    username: string;
    email: string;
    password: string;
    departmentCode: number;
}

export const createTeacher = async (data: TeacherData) => {
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: "teacher",
    });

    const code = await generateTeacherCode(data.departmentCode);

    return await Teachers.create({
        userId: user._id,
        teacherCode: code,
    });
};