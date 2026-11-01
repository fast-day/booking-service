import { Card } from "@/shared/ui";
import { useSuccess } from "../model/hooks/success.hook";

interface ISuccessProps {
  booking_id: string;
}

export const Success = ({ booking_id }: ISuccessProps) => {
  const { isLoading, data } = useSuccess(booking_id);
  return (
    <>
      <div className="grid gap-2.5">
        {isLoading ? (
          <div>Загрузка...</div>
        ): (
          data && <Card>{data.date}</Card>
        )}
      </div>
    </>
  )
}
