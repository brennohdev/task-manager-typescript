import { taskResponseToGetAllTasksSchema } from '@/validator/taskSchema';
import { z } from 'zod';

const getAllTasksResponseArraySchema = z.array(taskResponseToGetAllTasksSchema);

type Task = z.infer<typeof taskResponseToGetAllTasksSchema>;

interface DataCalendarProps {
  data: Task[];
}


export const DataCalendar = ({ data }:DataCalendarProps) => {
    return (
        <div>
            Data Calendar
        </div>
    )
}
