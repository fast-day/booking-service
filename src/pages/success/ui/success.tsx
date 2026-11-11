import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { useSuccess } from "../model/hooks/success.hook";
import { Card } from "@/shared/ui";
import { AppLoading } from "@/widgets/loading";
import { downloadIcs, googleUrl, outlookUrl } from "../model/utils/calendar.util";

interface ISuccessProps {
  booking_id: string;
}

const COLORS = ["#63da69", "#d9392d", "#b5654a", "#5b5046", "#FFBF5E"];

const fire = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  const origin = {
    x: (r.left + r.width / 2) / window.innerWidth,
    y: (r.top + r.height / 2) / window.innerHeight,
  };
  const base = { origin, colors: COLORS, disableForReducedMotion: true, zIndex: 50 };

  confetti({ ...base, angle: 90, spread: 80, particleCount: 70, startVelocity: 48, gravity: 1.2, decay: 0.9, scalar: 0.85, ticks: 180 });
  confetti({ ...base, angle: 90, spread: 140, particleCount: 28, startVelocity: 28, gravity: 0.55, decay: 0.93, scalar: 1.3, shapes: ["circle"], ticks: 320 });
};

const fmtDate = (d: string) =>
  new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" })
    .format(new Date(`${d}T00:00:00`));

const fmtPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 py-3 text-sm">
    <span className="text-accent/50">{label}</span>
    <span className="text-right font-medium">{value}</span>
  </div>
);

export const Success = ({ booking_id }: ISuccessProps) => {
  const { isLoading, data } = useSuccess(booking_id);
  const checkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !checkRef.current) return;
    const t = setTimeout(() => fire(checkRef.current!), 450);
    return () => clearTimeout(t);
  }, [data?.id]);

  if (isLoading || !data) return <AppLoading />;

  const bs = data.booking_services[0];
  const total = data.booking_services.reduce((s, x) => s + x.booking_service_price * x.booking_service_count, 0);
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  const btn =
    "rounded-xl bg-white px-2 py-2 text-sm font-medium transition hover:opacity-80 active:scale-[0.97] duration-200";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div
        ref={checkRef}
        className="motion-safe:animate-pop flex size-20 items-center justify-center rounded-full bg-accent text-white"
      >
        <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M5.5 12.5l4.2 4.2 8.8-9.4"
            pathLength={1}
            className="motion-safe:animate-draw motion-safe:[stroke-dasharray:1] motion-safe:[stroke-dashoffset:1]"
          />
        </svg>
      </div>

      <h1 className="motion-safe:animate-rise mt-8 text-3xl font-semibold tracking-tight" style={delay(500)}>
        Вы записаны
      </h1>
      <p className="motion-safe:animate-rise mt-2 text-accent" style={delay(600)}>
        {fmtDate(data.date)}, {data.start_time}–{data.end_time}
      </p>

      <Card className="motion-safe:animate-rise mt-10 w-full divide-y divide-border px-5 py-2 text-lef bg-white" style={delay(750)}>
        <Row label="Услуга" value={bs.service.name} />
        <Row label="Специалист" value={bs.user.full_name} />
        <div className="flex justify-between gap-4 py-3 text-sm">
          <span className="text-accent/50">Телефон</span>
          <a href={`tel:${bs.user.phone}`} className="text-right font-medium hover:underline duration-150">{bs.user.phone}</a>
        </div>
        <Row label="Итого" value={fmtPrice(total)} />
      </Card>

      <div className="motion-safe:animate-rise mt-5 w-full" style={delay(900)}>
        <p className="mb-3 text-11 uppercase tracking-widest">Добавить в календарь</p>
        <div className="grid grid-cols-3 gap-2">
          <a href={googleUrl(data)} target="_blank" rel="noopener noreferrer" className={btn}>Google</a>
          <a href={outlookUrl(data)} target="_blank" rel="noopener noreferrer" className={btn}>Outlook</a>
          <button type="button" onClick={() => downloadIcs(data)} className={btn}>Apple</button>
        </div>
      </div>

      <p className="motion-safe:animate-rise mt-6 text-xs text-accent/50" style={delay(900)}>
        Номер записи {data.tag}. Подтверждение отправлено на {data.customer.customer_attributes.email}
      </p>
    </div>
  );
}