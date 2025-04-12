import mongoose from 'mongoose';
import TaskModel from '../models/task';
import { Task } from '../../../domain/entities/Task';
import { TaskPriorityEnumType, TaskStatusEnumType } from '../../../domain/enums/taskStatus';

export async function seedTasks() {
  const existingProject = await mongoose.connection.collection('projects').findOne({});

  const existingUser = await mongoose.connection.collection('users').findOne({});

  const existingWorkspace = await mongoose.connection.collection('workspaces').findOne({});

  if (!existingProject || !existingUser || !existingWorkspace) {
    throw new Error('Dados necessários não encontrados para criar tarefas.');
  }

  const now = new Date();

  const tasks: Task[] = [
    new Task(
      'TASK-001', // taskCode
      'Criar wireframe', // title
      'Desenhar a estrutura inicial do site', // description
      new mongoose.Types.ObjectId(existingProject._id), // project
      new mongoose.Types.ObjectId(existingWorkspace._id), // workspace
      'TODO' as TaskStatusEnumType, // status
      'HIGH' as TaskPriorityEnumType, // priority
      new mongoose.Types.ObjectId(existingUser._id), // assignedTo
      new mongoose.Types.ObjectId(existingUser._id), // createdBy
      new Date('2025-04-15'), // dueDate
      now, // createdAt
      now, // updatedAt
    ),
    new Task(
      'TASK-002',
      'Conectar backend',
      'Integrar API com front-end',
      new mongoose.Types.ObjectId(existingProject._id),
      new mongoose.Types.ObjectId(existingWorkspace._id),
      'IN_PROGRESS' as TaskStatusEnumType,
      'MEDIUM' as TaskPriorityEnumType,
      new mongoose.Types.ObjectId(existingUser._id),
      new mongoose.Types.ObjectId(existingUser._id),
      new Date('2025-04-20'),
      now,
      now,
    ),
    new Task(
      'TASK-003',
      'Testes de usuário',
      'Rodar testes com usuários reais',
      new mongoose.Types.ObjectId(existingProject._id),
      new mongoose.Types.ObjectId(existingWorkspace._id),
      'DONE' as TaskStatusEnumType,
      'LOW' as TaskPriorityEnumType,
      new mongoose.Types.ObjectId(existingUser._id),
      new mongoose.Types.ObjectId(existingUser._id),
      new Date('2025-04-30'),
      now,
      now,
    ),
  ];

  await TaskModel.deleteMany({});
  await TaskModel.insertMany(tasks);

  console.log('✅ Tasks seeded com sucesso!');
}
