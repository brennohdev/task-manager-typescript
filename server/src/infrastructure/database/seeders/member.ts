import mongoose from "mongoose";
import MemberModel from "../models/member";
import { Member } from "../../../domain/entities/Member";

export async function seedMembers() {
    const db = mongoose.connection;

    const user = await db.collection("users").findOne({});
    const workspace = await db.collection("workspaces").findOne({});

    if (!user || !workspace) {
    throw new Error("Usuário ou workspace não encontrado para criar membros.");
    }

    const now = new Date();

    const members: Member[] = [
    new Member(
        new mongoose.Types.ObjectId(user._id),
        new mongoose.Types.ObjectId(workspace._id),
        now
    ),
    ];

    await MemberModel.deleteMany({});
    await MemberModel.insertMany(members);

    console.log("✅ Membros seedados com sucesso!");
}
