import { z } from 'zod';

export const TaskStatusEnum = {
  BACKLOG: 'BACKLOG',
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE',
} as const;

export const TaskPriorityEnum = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const TaskStatusEnumSchema = z.enum([...Object.values(TaskStatusEnum)] as [
  string,
  ...string[],
]);

export const TaskPriorityEnumSchema = z.enum([...Object.values(TaskPriorityEnum)] as [
  string,
  ...string[],
]);
