import { ConfirmForm } from "@/widgets/confirm"

interface IConfirmPageProps {
  company: string;
  location_id: string;
  user_id: string;
}

export const ConfirmPage = ({ ...props }: IConfirmPageProps) => {
  return (
    <>
      <h1 className="text-3xl font-extrabold leading-7">Личная информация</h1>

      <ConfirmForm {...props} />
    </>
  )
}
