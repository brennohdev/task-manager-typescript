// src/database/seeders/userSeed.ts

import mongoose from "mongoose";
import connectDataBase from "../../config/dataBase";
import UserModel from "../models/user";

export const seedUsers = async () => {
    console.log("🌱 Iniciando seed de usuários...");

    try {
    await connectDataBase();

    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("🧹 Limpando usuários existentes...");
    await UserModel.deleteMany({}, { session });

    const users = [
        {
        name: "Brenno H.",
        email: "brenno@example.com",
        password: "senha123",
        profilePicture: null,
        currentWorkspace: null,
        isActive: true,
        lastLogin: null,
        },
        {
        name: "Colaborador X",
        email: "colaborador@example.com",
        password: "senha456",
        profilePicture: null,
        currentWorkspace: null,
        isActive: true,
        lastLogin: null,
        },
    ];

    for (const user of users) {
        const createdUser = new UserModel(user);
        await createdUser.save({ session });
        console.log(`✅ Usuário ${user.email} criado.`);
    }

    await session.commitTransaction();
    session.endSession();

    console.log("✅ Seed de usuários concluída com sucesso.");
    } catch (error) {
    console.error("❌ Erro ao rodar seed de usuários:", error);
    throw error;
    } finally {
    await mongoose.disconnect();
    }
};
