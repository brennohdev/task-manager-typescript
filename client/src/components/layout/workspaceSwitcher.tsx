'use client';

import { useGetWorkspaces } from '@/features/workspace/hooks/useGetWorkspaces';
import { RiAddCircleFill } from 'react-icons/ri';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { WorkspaceAvatar } from '@/features/workspace/components/workspaceAvatar';

export const WorkspaceSwitcher = () => {
  const { data } = useGetWorkspaces();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-blue-950 font-semibold">Workspaces</p>
        <RiAddCircleFill className="size-5 text-blue-600 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-slate-200 font-medium p-1 truncate">
          <SelectValue placeholder="No workspace selected"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {data?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id} className="max-w=full truncate">
              <div className=" flex justify-start items-center gap-3 font-medium truncate max-w-[200px]">
                <WorkspaceAvatar name={workspace.name} />
                {workspace.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
