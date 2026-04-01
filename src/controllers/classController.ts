import Class from "@/models/Class";

export const createClass = async (data: any) => {
    return await Class.create(data);
};

export const assignStudent = async (studentId: string, classId: string) => {
    const Student = (await import("@/models/Student")).default;

    return await Student.findByIdAndUpdate(
        studentId,
        { classId },
        { new: true }
    );
};

export const assignTeacher = async (classId: string, teacherId: string) => {
    return await Class.findByIdAndUpdate(
        classId,
        { $addToSet: { teacherIds: teacherId } },
        { new: true }
    );
};