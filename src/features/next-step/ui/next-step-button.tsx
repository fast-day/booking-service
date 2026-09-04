import type { OrderSteps } from "@/entities/order";
import { ChevronIcon, NewOrderIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { useNavigate } from "@tanstack/react-router"

interface INextStepButtonProps {
  is_service: boolean;
  is_slot: boolean;
  service_id?: string;
  company: string;
  location_id: string;
  user_id: string;
  setStep: (step: OrderSteps) => void;
  step: OrderSteps;
}

interface StepConfig {
  is_valid: () => boolean;
  action?: () => void;
  text: string;
  icon: React.ComponentType;
}

interface IStepConfig {
  service: StepConfig;
  date: StepConfig;
  confirm: StepConfig;
}

export const NextStepButton = ({ is_service, is_slot, service_id, company, location_id, user_id, setStep, step }: INextStepButtonProps) => {
  const navigate = useNavigate();

  const stepConf: IStepConfig = {
    service: {
      is_valid: () => is_service,
      action: () => {
        navigate({ to: `${service_id}/date` });
        setStep("date");
      },
      text: "Далее",
      icon: ChevronIcon,
    },
    date: {
      is_valid: () => is_slot,
      action: () => {
        navigate({ to: `/${company}/${location_id}/${user_id}/${service_id}/confirm` });
        setStep("confirm");
      },
      text: "Продолжить",
      icon: ChevronIcon,
    },
    confirm: {
      is_valid: () => is_service && is_slot,
      text: "Записаться",
      icon: NewOrderIcon,
    }
  };

  const current = stepConf[step];

  return (
    <Button
      form={step === "confirm" ? "confirm" : undefined}
      size={"size_54"}
      className={"w-full font-medium"}
      animation={"toggle_sm"}
      onClick={current.action}
      disabled={!current.is_valid()}
      iconRight={<current.icon />}
    >{current.text}</Button>
  )
}
