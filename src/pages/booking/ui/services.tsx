import { ServiceCard } from "@/entities/service";
import { useGetServices } from "../model/hooks/service.hook";

interface IServicePageProps {
  user_id: string;
}

export const ServicePage = ({ user_id }: IServicePageProps) => {
  const { isLoading, data } = useGetServices(user_id);

  return (
    <>
      <h1 className="1100:text-3xl text-2xl font-extrabold leading-7">Выберите услугу</h1>

      <div className="grid gap-2.5">
        {isLoading ? (
          <div>Загрузка...</div>
        ): (
          data && data.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))
        )}
      </div>
    </>
  )
}
