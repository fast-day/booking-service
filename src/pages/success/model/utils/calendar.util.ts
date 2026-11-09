import type { IBookingDetail } from "@/entities/booking";

const stamp = (date: string, time: string) =>
  `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;

const esc = (s = "") =>
  s.replace(/\\/g, "\\\\").replace(/[;,]/g, "\\$&").replace(/\n/g, "\\n");

const info = (b: IBookingDetail) => ({
  title: b.booking_services.map((s) => s.service.name).join(", "),
  start: stamp(b.date, b.start_time),
  end: stamp(b.date, b.end_time),
});

export const googleUrl = (b: IBookingDetail) => {
  const e = info(b);
  return "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.start}/${e.end}`,
  });
};

export const outlookUrl = (b: IBookingDetail) => {
  const e = info(b);
  return "https://outlook.live.com/calendar/0/deeplink/compose?" + new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: e.title,
    startdt: `${b.date}T${b.start_time}:00`,
    enddt: `${b.date}T${b.end_time}:00`,
  });
};

export const downloadIcs = (b: IBookingDetail) => {
  const e = info(b);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FastDay//RU",
    "BEGIN:VEVENT",
    `UID:${b.id}@fast-day.ru`,
    `DTSTAMP:${stamp(new Date().toISOString().slice(0, 10), "00:00")}`,
    `DTSTART:${e.start}`,
    `DTEND:${e.end}`,
    `SUMMARY:${esc(e.title)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "booking.ics";
  a.click();
  URL.revokeObjectURL(url);
};