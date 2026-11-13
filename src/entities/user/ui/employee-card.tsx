import { Avatar } from "@/shared/ui"
import type { IEmployee } from "../types/employee.type";
import { cn } from "@/shared/utils";

interface IEmployeeCardProps {
  profile: IEmployee;
  className?: string;
}

export const EmployeeCard = ({ profile, className="" }: IEmployeeCardProps) => {
  return (
    <div className={cn("items-center gap-3.5", className)}>
      <Avatar size={"size_64"} id={profile.profile.id} name={profile.profile.full_name} avatar_url={profile.profile.avatar} />
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold">{profile.profile.full_name}</h2>
      </div>
    </div>
  )
}
