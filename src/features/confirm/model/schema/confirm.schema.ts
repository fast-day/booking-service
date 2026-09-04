import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const confirmSchema = z.object({
  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),

  email: z.email("Укажите email"),
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),

  comment: z.string().optional().nullable(),
});

export type ConfirmType = z.infer<typeof confirmSchema>;
