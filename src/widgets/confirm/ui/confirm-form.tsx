import { confirmSchema, useConfirm } from "@/features/confirm"
import { Form, InputForm, PhoneInput, TextareaForm } from "@/shared/ui"
import { Controller } from "react-hook-form"

interface IConfirmFormProps {
  company: string;
}

export const ConfirmForm = ({ company }: IConfirmFormProps) => {
  const { onSubmit } = useConfirm(company);

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
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={field.value}
                  onChange={field.onChange}
                  inputSize="size_56"
                  error={formState.errors["phone"]}
                  placeholder="Телефон"
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
