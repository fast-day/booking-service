import { ServiceCard } from "@/entities/service";
import { useGetServices } from "../model/hooks/service.hook";

export const ServicePage = () => {
  const { isLoading, data } = useGetServices();

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-7">Выберите услугу</h1>

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
