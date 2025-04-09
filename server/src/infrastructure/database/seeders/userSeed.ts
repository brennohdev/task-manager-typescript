import "dotenv/config";
import mongoose from "mongoose";
import connectDataBase from "../../config/dataBase";
import UserModel from "../models/userModel";

// Função principal para rodar a seed
const seedUsers = async () => {
    console.log("🌱 Iniciando seed de usuários...");

    try {
    await connectDataBase();

    const session = await mongoose.startSession();
    session.startTransaction();

    // Limpa os usuários existentes
    console.log("🧹 Limpando usuários existentes...");
    await UserModel.deleteMany({}, { session });

    // Lista de usuários de exemplo
    const users = [
        {
        name: "Brenno H.",
        email: "brenno@example.com",
        password: "senha123",
        profilePicture: null,
        currentWorkspace: null, // Será atribuído após criarmos workspaces
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

    // Salva os usuários
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
    } finally {
    await mongoose.disconnect();
    }
};

seedUsers();
