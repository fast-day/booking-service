import { SlotCard, type ISlot } from "@/entities/slots";
import { format } from "date-fns";

interface ISlotsProps {
  date: Date;
  data?: ISlot[];
  selectSlot?: string;
  setSlot: (slot: string) => void;
}

export const Slots = ({ data, date, selectSlot, setSlot }: ISlotsProps) => {
  const key = format(date, "yyyy-MM-dd");
  const now = new Date();
  const isToday = key === format(now, "yyyy-MM-dd");
  const nowStr = format(now, "HH:mm");

  const slots = (data?.find(d => d.date === key)?.slots ?? [])
    .filter(s => !isToday || s.start > nowStr);

  if (!slots.length) {
    return <div className="text-center text-sm py-10 opacity-60">Нет свободных слотов на выбранную дату</div>;
  }

  return (
    <div className="grid gap-2.5 justify-center">
      {slots.map((interval, idx) => (
        <SlotCard
          key={idx}
          slot={interval}
          isSelect={selectSlot === interval.start}
          onSelect={setSlot}
        />
      ))}
    </div>
  )
}
