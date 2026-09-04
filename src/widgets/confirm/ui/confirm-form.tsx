import { confirmSchema, useConfirm } from "@/features/confirm"
import { Form, InputForm, TextareaForm } from "@/shared/ui"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"

interface IConfirmFormProps {
  company: string;
  location_id: string;
  user_id: string;
}

export const ConfirmForm = ({ company, location_id, user_id }: IConfirmFormProps) => {
  const { onSubmit } = useConfirm(company, location_id, user_id);

  return (
    <div>

      <Form
        id={"confirm"}
        className={"space-y-5"}
        onSubmit={onSubmit}
        schema={confirmSchema}
      >
        {({ register, formState, control }) => (
          <>
            <Controller
              name={"phone"}
              control={control}
              render={({ field, formState }) => (
                <PatternFormat
                  id={"phone"}
                  name={"phone"}
                  format={"+7 (###) ### ##-##"}
                  mask={"_"}
                  onChange={(v) => field.onChange(v)}
                  value={field.value}
                  customInput={InputForm}
                  required
                  register={register("phone")}
                  label={"Номер телефона"}
                  inputSize={"size_56"}
                  error={formState.errors["phone"]}
                  placeholder={"+7 (000) 000 00-00"}
                />
              )}
            />
            <InputForm
              name={"email"}
              id={"email"}
              type={"email"}
              inputSize={"size_56"}
              register={register("email")}
              label={"Элекстронная почта"}
              placeholder={"example@gmail.com"}
              error={formState.errors["email"]}
              required
            />
            <div className="grid grid-cols-2 gap-5">
              <InputForm
                name={"first_name"}
                id={"first_name"}
                type={"text"}
                inputSize={"size_56"}
                register={register("first_name")}
                label={"Имя"}
                placeholder={"Имя"}
                error={formState.errors["first_name"]}
                required
              />
              <InputForm
                name={"last_name"}
                id={"last_name"}
                type={"text"}
                inputSize={"size_56"}
                register={register("last_name")}
                label={"Фамилия"}
                placeholder={"Фамилия"}
                error={formState.errors["last_name"]}
              />
            </div>
            <TextareaForm
              name={"comment"}
              id={"comment"}
              register={register("comment")}
              label={"Комментарий"}
              placeholder={"Комментарий"}
              error={formState.errors["comment"]}
            />
          </>
        )}
      </Form>

    </div>
  )
}
