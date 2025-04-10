// src/infrastructure/database/seeders/projectSeed.ts
import mongoose from "mongoose";
import ProjectModel from "../models/project";
import { Project } from "../../../domain/entities/Project";

export async function seedProjects() {
    const existingWorkspace = await mongoose.connection
    .collection("workspaces")
    .findOne({});

    const existingUser = await mongoose.connection
    .collection("users")
    .findOne({});

    if (!existingWorkspace || !existingUser) {
    throw new Error("Workspace ou usuário não encontrado para criar projetos.");
    }

    const now = new Date();

    const projects: Project[] = [
    new Project(
        "Site da Comunidade",
        "Projeto de código aberto para comunidade Rocket",
        "🚀",
        new mongoose.Types.ObjectId(existingWorkspace._id),
        new mongoose.Types.ObjectId(existingUser._id),
        now,
        now
    ),
    new Project(
        "Painel Escolar",
        "Dashboard de gerenciamento para alunos e professores",
        "🏫",
        new mongoose.Types.ObjectId(existingWorkspace._id),
        new mongoose.Types.ObjectId(existingUser._id),
        now,
        now
    ),
    ];

    await ProjectModel.deleteMany({});
    await ProjectModel.insertMany(projects);

    console.log("✅ Projects seeded com sucesso!");
}
