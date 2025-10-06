"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspace } from "@/utils/workspace/api/use-get-workspace";
import { WorkspaceAvatar } from "./WorkspaceAvatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500"> Workspace</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="No workspace Selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspaces) => (
            <SelectItem key={workspaces.$id} value={workspaces.$id}>
              <div className="flex justiy-start items-center gap-4 font-medium">
                <WorkspaceAvatar name={workspaces.name} image={workspaces.imageUrl}/>

                <span className="truncate">{workspaces.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
