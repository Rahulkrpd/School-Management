import Student from "@/models/Student";
import Teachers from "@/models/Teachers";
import Class from "@/models/Class";

const pad = (n: number, s: number) => n.toString().padStart(s, "0");

const sectionCode = (s: string) => pad(s.charCodeAt(0) - 64, 2);

export const generateStudentRoll = async (classId: string) => {
    const cls = await Class.findById(classId);
    const year = new Date().getFullYear();

    const count = await Student.countDocuments({ classId });

    return `${year}00${pad(cls.classNo, 2)}${sectionCode(cls.section)}${pad(
        count + 1,
        2
    )}`;
};

export const generateTeacherCode = async (dept: number) => {
    const year = new Date().getFullYear();
    const count = await Teachers.countDocuments();

    return `${year}01${dept}${pad(count + 1, 2)}`;
};