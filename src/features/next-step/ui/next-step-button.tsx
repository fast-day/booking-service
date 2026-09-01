import type { OrderSteps } from "@/entities/order";
import { ChevronIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { useNavigate } from "@tanstack/react-router"

interface INextStepButtonProps {
  is_service: boolean;
  is_date: boolean;
  service_id?: string;
  setStep: (step: OrderSteps) => void;
  step: OrderSteps;
}

interface StepConfig {
  is_valid: () => boolean;
  action: () => void;
}

interface IStepConfig {
  service: StepConfig;
  date: StepConfig;
  confirm: StepConfig;
}

export const NextStepButton = ({ is_service, is_date, service_id, setStep, step }: INextStepButtonProps) => {
  const navigate = useNavigate();

  const stepConf: IStepConfig = {
    service: {
      is_valid: () => is_service,
      action: () => {
        navigate({ to: `${service_id}/date` });
        setStep("date");
      },
    },
    date: {
      is_valid: () => is_date,
      action: () => {
        navigate({ to: `${service_id}/confirm` });
        setStep("confirm");
      },
    },
    confirm: {
      is_valid: () => is_service && is_date,
      action: () => {
        console.log("test");
      },
    }
  };

  const current = stepConf[step];

  return (
    <Button
      size={"size_54"}
      className={"w-full font-medium"}
      animation={"toggle_sm"}
      onClick={current.action}
      disabled={!current.is_valid()}
      iconRight={<ChevronIcon width={20} height={20} />}
    >Далее</Button>
  )
}
