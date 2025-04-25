import { taskResponseToGetAllTasksSchema } from '@/validator/taskSchema';
import { z } from 'zod';
import { format, getDay, parse, startOfWeek, addMonths, subMonths } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './dataCalendar.css';
import { EventCard } from './eventCard';
import { TaskPriorityEnumType, TaskStatusEnumType } from '@/domain/enums/taskEnums';
import { Button } from '@/components/ui/button';
import { Calendar1Icon, ChevronsLeft, ChevronsRight } from 'lucide-react';

const getAllTasksResponseArraySchema = z.array(taskResponseToGetAllTasksSchema);

type Task = z.infer<typeof taskResponseToGetAllTasksSchema>;

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

interface CustomToolBarProps {
  date: Date;
  onNavigate: (action: 'PREV' | 'TODAY' | 'NEXT') => void;
}

const CustomToolBar = ({ date, onNavigate }: CustomToolBarProps) => {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        onClick={() => onNavigate('PREV')}
        variant="secondary"
        size="icon"
        className="flex items-center"
      >
        <ChevronsLeft className="size-4" />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
        <Calendar1Icon className="size-4 mr-2" />
        <p className="text-sm">{format(date, 'MMM yyyy')}</p>
      </div>
      <Button
        onClick={() => onNavigate('NEXT')}
        variant="secondary"
        size="icon"
        className="flex items-center"
      >
        <ChevronsRight className="size-4" />
      </Button>
    </div>
  );
};

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(data[0]?.dueDate ? new Date(data[0].dueDate) : new Date());

  const events = data
    .filter((task) => task.dueDate !== null) // garante que não é null
    .map((task) => ({
      start: new Date(task.dueDate!), // agora o TS sabe que não é null
      end: new Date(task.dueDate!),
      title: task.title,
      project: task.project.name,
      assignedTo: task.assignedTo,
      status: task.status as TaskStatusEnumType,
      priority: task.priority as TaskPriorityEnumType,
      id: task.id,
    }));

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    if (action === 'PREV') {
      setValue(subMonths(value, 1));
    } else if (action === 'NEXT') {
      setValue(addMonths(value, 1));
    } else if (action === 'TODAY') {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={['month']}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) => localizer?.format(date, 'EEE', culture) ?? '',
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignedTo={event.assignedTo}
            priority={event.priority}
            status={event.status}
          />
        ),
        toolbar: () => <CustomToolBar date={value} onNavigate={handleNavigate} />,
      }}
    />
  );
};
