import { Card, CardContent } from "@/shared/ui"
import { cn } from "@/shared/utils";
import type { ISlotTime } from "../model/types/slot.type";

interface ISlotCardProps {
  slot: ISlotTime;
  isSelect: boolean;
  onSelect: (slot: string) => void;
}

export const SlotCard = ({ slot, isSelect, onSelect }: ISlotCardProps) => {
  return (
    <Card
      className={cn("w-fit cursor-pointer hover:bg-primary/10 duration-200 rounded-xl font-medium", isSelect ? "bg-white hover:bg-white font-bold" : "")}
      onClick={() => onSelect(slot.start)}
    >
      <CardContent className={"px-20 py-3.75 grid gap-5"}>
        {slot.start} - {slot.end}
      </CardContent>
    </Card>
  )
}
