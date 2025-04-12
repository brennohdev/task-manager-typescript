import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TaskModel from '../infrastructure/database/models/task';
import { TaskRepository } from '../infrastructure/database/repositories/task';
import { Task } from '../domain/entities/Task';
import { TaskPriorityEnum, TaskStatusEnum } from '../domain/enums/taskStatus';

describe('TaskRepository', () => {
  let mongoServer: MongoMemoryServer;
  let repository: TaskRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    repository = new TaskRepository();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await TaskModel.deleteMany({});
  });

  it('should create and find a task by ID', async () => {
    const task = new Task(
      'T-001',
      'My Task',
      'My task description',
      new Types.ObjectId(),
      new Types.ObjectId(),
      TaskStatusEnum.TODO,
      TaskPriorityEnum.HIGH,
      null,
      new Types.ObjectId(),
      new Date(),
    );

    const created = await repository.create(task);
    const found = await repository.findById(created.id!);

    expect(found).not.toBeNull();
    expect(found!.taskCode).toBe('T-001');
    expect(found!.tittle).toBe('My Task');
  });

  it('should find tasks by project ID', async () => {
    const projectId = new Types.ObjectId();

    const task1 = new Task(
      'T-001',
      'Task A',
      null,
      projectId,
      new Types.ObjectId(),
      TaskStatusEnum.TODO,
      TaskPriorityEnum.LOW,
      null,
      new Types.ObjectId(),
      null,
    );

    const task2 = new Task(
      'T-002',
      'Task B',
      null,
      projectId,
      new Types.ObjectId(),
      TaskStatusEnum.DONE,
      TaskPriorityEnum.MEDIUM,
      null,
      new Types.ObjectId(),
      null,
    );

    await repository.create(task1);
    await repository.create(task2);

    const tasks = await repository.findByProject(projectId);

    expect(tasks.length).toBe(2);
    expect(tasks[0].project.toString()).toBe(projectId.toString());
  });

  it('should update a task', async () => {
    const task = new Task(
      'T-003',
      'Task to update',
      'Old desc',
      new Types.ObjectId(),
      new Types.ObjectId(),
      TaskStatusEnum.TODO,
      TaskPriorityEnum.LOW,
      null,
      new Types.ObjectId(),
      null,
    );

    const created = await repository.create(task);
    created.description = 'New desc';
    created.priority = TaskPriorityEnum.HIGH;

    await repository.update(created);

    const updated = await repository.findById(created.id!);
    expect(updated!.description).toBe('New desc');
    expect(updated!.priority).toBe(TaskPriorityEnum.HIGH);
  });

  it('should delete a task', async () => {
    const task = new Task(
      'T-004',
      'Task to delete',
      null,
      new Types.ObjectId(),
      new Types.ObjectId(),
      TaskStatusEnum.TODO,
      TaskPriorityEnum.LOW,
      null,
      new Types.ObjectId(),
      null,
    );

    const created = await repository.create(task);
    await repository.delete(created.id!);

    const deleted = await repository.findById(created.id!);
    expect(deleted).toBeNull();
  });
});
