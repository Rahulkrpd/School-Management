import mongoose from "mongoose";
import User from "@/models/User";

export const replacePrincipal = async (data: any) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Step 1: remove old principal
        await User.deleteOne({ role: "principal" }).session(session);

        // Step 2: create new principal
        const newPrincipal = await User.create(
            [
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: "principal",
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return newPrincipal[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};