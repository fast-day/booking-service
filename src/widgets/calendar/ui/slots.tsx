import { SlotCard, type ISlot } from "@/entities/slots";

interface ISlotsProps {
  data?: ISlot[];
  selectSlot?: string;
  setSlot: (slot: string) => void;
}

export const Slots = ({ data, selectSlot, setSlot }: ISlotsProps) => {

  return (
    <div className="grid gap-2.5 justify-center">
      {data && data.map((slot) => (
        slot.slots.map((interval, idx) => (
          <SlotCard
            key={idx}
            slot={interval}
            isSelect={selectSlot === interval.start}
            onSelect={setSlot}
          />
        ))
      ))}
    </div>
  )
}
