import { WatermarkWorked } from "@/entities/watermark"
import { cn } from "@/shared/utils";

interface IContentPanelProps {
  children: React.ReactNode;
  isConfirm: boolean;
}

export const ContentPanel = ({ children, isConfirm }: IContentPanelProps) => {
  return (
    <div className={cn(
      "bg-white max-w-145 1100:mx-0 mx-auto 1100:min-w-95 1100:max-w-120 w-full 1100:h-[calc(100vh-92px)] 1100:sticky 11000:top-6 rounded-4xl flex",
      !isConfirm && "1100:relative fixed bottom-0 left-0 right-0 rounded-b-none 1100:rounded-4xl",
    )}>
      <div className="px-5 1100:px-10 pt-5 1100:pt-10 pb-5 flex flex-col flex-1 gap-8">
        <div className="h-full flex flex-col gap-5">
          {children}
          {isConfirm && (
            <div className="text-sm opacity-50">
              {"Продолжая, вы подтверждаете, что прочитали и соглашаетесь с "}
              <a href="https://storage.fast-day.ru/site-documents/terms_of_service_WEB301026.pdf" className="underline" target="_blank">Условия использования</a>
              {" и "}
              <a href="https://storage.fast-day.ru/site-documents/personal_data_processing_policy_WEB301026.pdf" className="underline" target="_blank">Политику обработки персональных данных</a> {" "}
              FastDay, а также даёте согласие на обработку ваших персональных данных для этой записи.
            </div>
          )}
        </div>
        <div className={cn(
          "items-center justify-center",
          isConfirm ? "flex" : "hidden 1100:flex"
        )}>
          <WatermarkWorked />
        </div>
      </div>
    </div>
  )
}
