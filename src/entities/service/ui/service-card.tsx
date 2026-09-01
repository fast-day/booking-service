import { useOrderState } from "@/entities/order";
import { ChevronIcon } from "@/shared/icons"
import { Avatar, Button, Card, CardContent } from "@/shared/ui"
import { cn, formatPrice, minuteFormat } from "@/shared/utils";
import { useState } from "react";
import type { IService } from "../model/types/service.type";

interface IServiceCardProps {
  service: IService;
}

export const ServiceCard = ({ service }: IServiceCardProps) => {
  const { id, name, price, duration, avatar } = service;
  const [isOpen] = useState(false);
  
  // const onClick = () => {
  //   setIsOpen(p => !p);
  // }
  
  /* ===== TEST ===== */
  const { setService } = useOrderState();

  const handleSelect = (service: IService) => {
    setService({ ...service })
  }

  return (
    <Card className="cursor-pointer hover:bg-primary/10 duration-200" onClick={() => handleSelect(service)}>
      <CardContent className="px-4 py-3.75 grid gap-5">
        <div className="flex items-center gap-3.75 w-full">
          <Avatar size={"size_64"} id={id} name={name} avatar_url={avatar} />
          <div className="grid flex-1 gap-1.75">
            <p className="font-extrabold text-xl leading-5">{name}</p>
            <div className="flex items-center gap-3">
              <p className="text-sm opacity-50 leading-4">{formatPrice(price.price)} ₽</p>
              <p className="text-sm opacity-50 leading-4">{minuteFormat(duration)}</p>
            </div>
          </div>

          <Button
            variant={"white"}
            size={"icon_44"}
            animation={"toggle_sm"}
            // onClick={onClick}
            className={cn(isOpen ? "bg-primary text-white" : "")}
            classNameChild={cn(isOpen ? "-rotate-90" : "", "duration-150 ease-initial")}
          >
            <ChevronIcon width={20} height={20}/>
          </Button>
        </div>
        {/* {isOpen && (
          <div className="space-y-5">
            <p className="text-sm font-medium leading-5">Подробная консультация по выбору направления и составлению индивидуального плана развития. Определение сильных и слабых сторон, постановка реалистичных целей и рекомендаций.</p>

            <div className="grid">
              <div className="flex items-center gap-2.5">
                <div className="w-6.5 h-6.5 flex items-center justify-center bg-white rounded-12">
                  <CheckIcon width={20} height={20} />
                </div>
                <p className="text-sm font-medium">Индивидуальная консультация</p>
              </div>
            </div>
          </div>
        )} */}
        
      </CardContent>
    </Card>
  )
}
