import { Avatar } from "@/shared/ui"
import type { IEmployee } from "../types/employee.type";

export const EmployeeCard = ({ profile }: IEmployee) => {
  return (
    <div className="flex items-center gap-3.5">
      <Avatar size={"size_64"} id={profile.id} name={profile.full_name} avatar_url={profile.avatar} />
      <div className="space-y-2">
        <h2 className="text-xl font-extrabold leading-4">{profile.full_name}</h2>
        <p className="text-sm leading-3 opacity-50">{profile.position}</p>
      </div>
    </div>
  )
}
