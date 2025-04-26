import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface WorkspaceAnalyticsChartProps {
  countTotalTasks: number;
  countOverdueTasks: number;
  countCompletedTasks: number;
}

const WorkspaceAnalyticsChart: React.FC<WorkspaceAnalyticsChartProps> = ({
  countTotalTasks,
  countOverdueTasks,
  countCompletedTasks,
}) => {
  const countIncompleteTasks = countTotalTasks - (countOverdueTasks + countCompletedTasks);

  const data = [
    { name: 'Overdue Tasks', value: countOverdueTasks },
    { name: 'Completed Tasks', value: countCompletedTasks },
    { name: 'Incomplete Tasks', value: countIncompleteTasks },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="0" />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#333' }} 
          axisLine={false} 
        />

        <YAxis
          tick={{ fontSize: 12, fill: '#333' }} 
          axisLine={true} 
          domain={[0, countTotalTasks]} 
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px 10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          itemStyle={{ fontSize: '14px', color: '#333' }}
        />

        <Bar dataKey="value" fill="#407BFF" radius={[10, 10, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkspaceAnalyticsChart;
