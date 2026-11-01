import z from "zod";
import { isPossiblePhoneNumber } from 'libphonenumber-js';

export const confirmSchema = z.object({
  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),

  email: z.email("Укажите email"),
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),

  comment: z.string().optional().nullable(),
});

export type ConfirmType = z.infer<typeof confirmSchema>;
