import mongoose from "mongoose";
import WorkspaceModel from "../models/workspace";
import { Workspace } from "../../../domain/entities/Workspace";
import { Types } from "mongoose";

export async function seedWorkspaces() {
    const existingUser = await mongoose.connection
    .collection("users")
    .findOne({});

    if (!existingUser) {
    throw new Error("Nenhum usuário encontrado para associar ao workspace.");
    }

    const now = new Date();
  const userId = new Types.ObjectId(existingUser._id); // Agora é Types.ObjectId

    const workspaces: Workspace[] = [
    new Workspace(
        "Equipe Rocket",
        "Equipe focada em projetos open-source",
        userId,
        "ROCKET123",
        now,
        now
    ),
    new Workspace(
        "Projeto Escola",
        "Trabalho da faculdade de Ciência de Dados",
        userId,
        "ESCOLA456",
        now,
        now
    ),
    ];

    await WorkspaceModel.deleteMany({});
    await WorkspaceModel.insertMany(workspaces);

    console.log("✅ Workspaces seeded com sucesso!");
}
