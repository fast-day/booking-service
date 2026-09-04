import { useCallback, useMemo, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Virtual } from "swiper/modules"
import { addWeeks, format, startOfWeek } from "date-fns";
import { Button } from "@/shared/ui";
import { ChevronIcon } from "@/shared/icons";
import { getWeekDays } from "../model/utils/get-week-days.util";
import "swiper/css";
import { Week } from "@/features/calendar";
import { ru } from "date-fns/locale";

interface IWeeKCalendarProps {
  selected: Date;
  onSelected: (d: Date) => void;
}

const ANCHOR = startOfWeek(new Date(), { weekStartsOn: 1 });

const CENTER = 2;
const SLIDES_COUNT = 5;

export const WeeKCalendar = ({ selected, onSelected }: IWeeKCalendarProps) => {
  const ref = useRef<SwiperType | null>(null);

const [weekOffset, setWeekOffset] = useState(0);

const weeks = useMemo(() => {
  return Array.from( { length: SLIDES_COUNT }, (_, index) => {
    const offset = weekOffset + index - CENTER;
    return getWeekDays( addWeeks(ANCHOR, offset) );
  });
}, [weekOffset]);

  const currentWeekDays = weeks[CENTER];

  const monthTitle = useMemo(() => {
    if (!currentWeekDays) return "";
    return format( currentWeekDays[3], "LLLL yyyy", { locale: ru, } ); 
  }, [currentWeekDays]);

  const changeWeek = useCallback((direction: -1 | 1) => {
    setWeekOffset((prev) => prev + direction);
    requestAnimationFrame(() => {
      ref.current?.slideTo( CENTER, 0, false );
    });
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const index = swiper.activeIndex;
    if (index === CENTER - 1) {
      changeWeek(-1); return;
    }
    if (index === CENTER + 1) {
      changeWeek(1); 
    }
  }, [changeWeek]);
  
  const handlePrev = useCallback(() => {
    changeWeek(-1);
  }, [changeWeek]);

  const handleNext = useCallback(() => {
    changeWeek(1);
  }, [changeWeek]);

  return (
    <div className="h-fit space-y-3">

      <div>
        <span className="text-lg font-bold capitalize">{monthTitle}</span>
      </div>

      <div className="relative">
        <Button
          size={"icon_36"}
          variant={"white"}
          onClick={handlePrev}
          className="absolute -left-13 top-1/2 -translate-y-1/2 z-10"
        ><ChevronIcon width={20} height={20} className="rotate-180" /></Button>

        <Swiper
          modules={[Virtual]}
          virtual
          initialSlide={CENTER}
          slidesPerView={1}
          onSwiper={s => ref.current = s}
          onSlideChange={handleSlideChange}
          speed={400}
        >
          {weeks.map((days, i) => (
            <SwiperSlide key={i} virtualIndex={i}>
              <Week
                days={days}
                selected={selected}
                onSelected={onSelected}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          size={"icon_36"}
          variant={"white"}
          onClick={handleNext}
          className={"absolute -right-13 top-1/2 -translate-y-1/2 z-10"}
        ><ChevronIcon width={20} height={20} /></Button>
      </div>

    </div>
  )
}
