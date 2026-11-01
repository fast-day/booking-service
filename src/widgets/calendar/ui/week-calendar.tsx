import { useCallback, useMemo, useRef, useState } from "react"
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { Button } from "@/shared/ui";
import { ChevronIcon } from "@/shared/icons";
import "swiper/css";
import { ru } from "date-fns/locale";
import { cn } from "@/shared/utils";

interface IWeeKCalendarProps {
  selected: Date;
  onSelected: (d: Date) => void;
}

const PAGE = 28;

export const WeeKCalendar = ({ selected, onSelected }: IWeeKCalendarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(PAGE * 2);

  const today = useMemo(() => startOfDay(new Date()), []);
  const days = useMemo(
    () => Array.from({ length: count }, (_, i) => addDays(today, i)),
    [today, count]
  );

  const monthTitle = format(selected, "LLLL yyyy", { locale: ru });

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (el && el.scrollWidth - el.scrollLeft - el.clientWidth < el.clientWidth) {
      setCount(c => c + PAGE);
    }
  }, []);

  const scrollPage = (dir: -1 | 1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth, behavior: "smooth" });

  return (
    <div className="h-fit w-full max-w-full min-w-0 space-y-3 [contain:inline-size]">
      <span className="text-lg font-bold capitalize">{monthTitle}</span>

      <div className="relative">
        <Button
          size="icon_36"
          variant="white"
          onClick={() => scrollPage(-1)}
          className="absolute -left-13 top-1/2 -translate-y-1/2 z-10 max-md:hidden"
        >
          <ChevronIcon width={20} height={20} className="rotate-180" />
        </Button>

        <div
          ref={ref}
          onScroll={handleScroll}
          className="flex gap-2.5 overflow-x-auto snap-x overscroll-x-contain scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {days.map(day => {
            const isSelected = isSameDay(day, selected);
            return (
              <button
                key={day.toISOString()}
                onClick={() => onSelected(day)}
                className={cn(
                  "min-w-18.5 snap-start shrink-0 basis-[calc((100%-3.75rem)/7)]",
                  "flex flex-col items-center gap-1 rounded-xl py-2.5 bg-card duration-200 hover:bg-primary/15",
                  isSelected && "bg-primary text-white hover:bg-primary"
                )}
              >
                <span className="text-xss font-medium opacity-50 leading-3 order-3 normal-case">
                  {format(day, "EEEEEE", { locale: ru })}
                </span>
                <span className="text-xl font-extrabold">{format(day, "d")}</span>
                <span className="block md:order-2 text-base font-medium capitalize leading-3">
                  {format(day, "LLL", { locale: ru })}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          size="icon_36"
          variant="white"
          onClick={() => scrollPage(1)}
          className="absolute -right-13 top-1/2 -translate-y-1/2 z-10 max-md:hidden"
        >
          <ChevronIcon width={20} height={20} />
        </Button>
      </div>
    </div>
  );
};