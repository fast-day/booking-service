import { cn } from "@/shared/utils";
import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { memo } from "react";

interface IWeekProps {
  days: Date[];
  selected: Date;
  onSelected: (date: Date) => void;
}

const isPastDate = (date: Date) => isBefore(startOfDay(date), startOfDay(new Date()));

export const Week = memo(({ days, selected, onSelected }: IWeekProps) => {
  return (
    <div className="grid grid-cols-7 gap-2.5">
      {days.map(day => {
        const isSelected = isSameDay(day, selected);
        const disabled = isPastDate(day);

        return (
          <button
            key={day.toISOString()}
            onClick={() => onSelected(day)}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center rounded-14 py-2.5 space-y-1.75 px-0.5 bg-card cursor-pointer hover:bg-primary/15 duration-200",
              isSelected && "bg-primary text-white hover:bg-primary",
              disabled && "cursor-not-allowed opacity-70 hover:bg-card"
            )}
          >
            <span className="text-xl font-extrabold">{format(day, "d")}</span>
            <span className="text-base font-medium capitalize leading-3">{format(day, "LLL", { locale: ru })}</span>
            <span className="text-xss font-medium opacity-50 leading-3">{format(day, "EEEEEE", { locale: ru })}</span>
          </button>
        );
      })}
    </div>
  );
});