import { TaskPriorityEnumSchema, TaskStatusEnumSchema } from '@/domain/enums/taskEnums';
import { z } from 'zod';

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();
export const assignedToSchema = z.string().trim().min(1).nullable().optional();

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || !isNaN(Date.parse(val)), {
    message: 'Invalid date format. Please provide a valid date string.',
  });

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: TaskPriorityEnumSchema,
  status: TaskStatusEnumSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

export const updateTaskSchema = createTaskSchema;

export const taskResponseSchema = z.object({
  taskCode: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  project: z.string(),
  workspace: z.string(),
  status: TaskStatusEnumSchema,
  priority: TaskPriorityEnumSchema,
  assignedTo: z.string().nullable(),
  createdBy: z.string(),
  dueDate: z.string().nullable(), // ISO date
  createdAt: z.string(), // ISO date
  updatedAt: z.string(), // ISO date
  id: z.string(),
});

export const createTaskResponseSchema = z.object({
  message: z.string(),
  task: taskResponseSchema,
});
