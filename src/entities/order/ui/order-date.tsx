import { CalendarIcon, HourglassIcon } from "@/shared/icons"
import { addMinutes, format } from "date-fns";
import { ru } from "date-fns/locale";
import { capitalizeFirst } from "../model/utils/capitalize-first";

interface IOrderDateProps {
  date: Date;
  slot: string;
  duration?: number;
}

export const OrderDate = ({ date, slot, duration }: IOrderDateProps) => {
  const dateLabel = capitalizeFirst(format(date, 'd MMMM, EEEE', { locale: ru }));

  const [hours, minutes] = slot.split(':').map(Number);
  const startDate = new Date(date);
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = addMinutes(startDate, duration ?? 0);

  const timeLabel = `${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')}`;
  
  return (
    <div className="border-t border-border">
      
      <div className="py-5 space-y-2">
        <div className="flex items-center gap-2.5">
          <span><CalendarIcon width={20} height={20} opacity={0.8} /></span>
          <span className="text-md font-medium leading-3.5 opacity-80 capitalize">{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span><HourglassIcon width={20} height={20} opacity={0.8} /></span>
          <span className="text-md font-medium leading-3.5 opacity-80">{timeLabel}</span>
        </div>
      </div>
    
    </div>
  )
}
