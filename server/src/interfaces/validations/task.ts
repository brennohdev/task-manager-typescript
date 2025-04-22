import { z } from 'zod';
import { TaskPriorityEnum, TaskStatusEnum } from '../../domain/enums/taskStatus';

// Validações para a criação de tarefas
export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const assignedToSchema = z.union([z.string().trim().min(1), z.null()]).optional();

export const prioritySchema = z.nativeEnum(TaskPriorityEnum);
export const statusSchema = z.nativeEnum(TaskStatusEnum);

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: 'Invalid date format. Please provide a valid date string.',
    },
  );

export const taskIdSchema = z.string().trim().min(1);

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

// Validações para a atualização de tarefas
export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  priority: z.nativeEnum(TaskPriorityEnum).optional(), // Corrigido para usar nativeEnum
  status: z.nativeEnum(TaskStatusEnum).optional(), // Corrigido para usar nativeEnum
  assignedTo: z.union([z.string().optional().nullable(), z.null()]).optional(), // Corrigido para permitir null
  dueDate: z.string().optional().refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: 'Invalid date format. Please provide a valid date string.',
    },
  ),
});