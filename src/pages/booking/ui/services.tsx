import { ServiceCard } from "@/entities/service";

interface IServicePageProps {
  company: string;
  location_id: string;
  user_id: string;
}

export const ServicePage = ({ company, location_id, user_id }: IServicePageProps) => {
  return (
    <div className="py-6 max-w-145 mx-auto w-full space-y-10">
      <h1 className="text-3xl font-extrabold leading-7">Выберите услугу</h1>

      <div className="grid gap-2.5">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  )
}
