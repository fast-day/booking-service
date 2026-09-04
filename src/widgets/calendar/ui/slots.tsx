import { SlotCard } from "@/entities/slots";

interface ISlotsProps {
  data?: string[];
  selectSlot?: string;
  setSlot: (slot: string) => void;
}

export const Slots = ({ data, selectSlot, setSlot }: ISlotsProps) => {

  return (
    <div className="grid gap-2.5 justify-center">
      {data && data.map((slot, idx) => (
        <SlotCard
          key={idx}
          slot={slot}
          isSelect={selectSlot === slot}
          onSelect={setSlot}
        />
      ))}
    </div>
  )
}
