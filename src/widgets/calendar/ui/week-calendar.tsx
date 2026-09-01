import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Virtual } from "swiper/modules"
import { addWeeks, startOfWeek, format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/shared/ui";
import { ChevronIcon } from "@/shared/icons";
import { getWeekDays } from "../model/utils/get-week-days.util";
import "swiper/css";

interface IWeeKCalendarProps {
  selected: Date;
  onSelected: (d: Date) => void;
}

const ANCHOR = startOfWeek(new Date(), { weekStartsOn: 1 });
const CENTER = 500;

export const WeeKCalendar = ({ selected, onSelected }: IWeeKCalendarProps) => {
  const ref = useRef<SwiperType | null>(null);
  const getWeekStart = (index: number) => addWeeks(ANCHOR, index - CENTER);

  return (
    <div className="h-fit relative">
      <Button
        size={"icon_36"}
        variant={"white"}
        onClick={() => ref.current?.slidePrev()}
        className="absolute -left-13 top-1/2 -translate-y-1/2 z-10"
      ><ChevronIcon width={20} height={20} className="rotate-180" /></Button>

      <Swiper
        modules={[Virtual]}
        virtual
        initialSlide={CENTER}
        slidesPerView={1}
        onSwiper={s => ref.current = s}
        speed={400}
      >
        {Array.from({ length: CENTER * 2 }).map((_, i) => (
          <SwiperSlide key={i} virtualIndex={i}>
            <div className="grid grid-cols-7 gap-2.5">
              {getWeekDays(getWeekStart(i)).map(day => (
                <div
                  key={day.toISOString()}
                  onClick={() => onSelected(day)}
                  className={`flex flex-col items-center rounded-14 py-2.5 space-y-1.75 px-0.5 bg-card cursor-pointer hover:bg-primary/15 duration-200 ${isSameDay(day, selected) ? "bg-primary text-white hover:bg-primary!" : ""}`}
                >
                  <span className="text-xl font-extrabold">{format(day, "d")}</span>
                  <span className="text-base font-medium capitalize leading-3">{format(day, "LLL", { locale: ru })}</span>
                  <span className="text-xss font-medium opacity-50 leading-3">{format(day, "EEEEEE", { locale: ru })}</span>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        size={"icon_36"}
        variant={"white"}
        onClick={() => ref.current?.slideNext()}
        className={"absolute -right-13 top-1/2 -translate-y-1/2 z-10"}
      ><ChevronIcon width={20} height={20} /></Button>
    </div>
  )
}
