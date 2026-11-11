import { WatermarkWorked } from "@/entities/watermark"
import { cn } from "@/shared/utils";

interface IContentPanelProps {
  children: React.ReactNode;
  isConfirm: boolean;
}

export const ContentPanel = ({ children, isConfirm }: IContentPanelProps) => {
  return (
    <div className={cn(
      "bg-white max-w-145 mx-auto w-full rounded-4xl flex",
      "1100:mx-0 1100:min-w-95 1100:max-w-120 1100:mr-8 1100:h-[calc(100vh-92px)] 1100:top-6 1100:self-start",
      isConfirm
        ? "1100:sticky"
        : "fixed bottom-0 left-0 right-0 rounded-b-none 1100:sticky 1100:inset-x-auto 1100:bottom-auto 1100:rounded-4xl",
    )}>
      <div className="px-5 1100:px-10 pt-5 1100:pt-10 pb-5 flex flex-col flex-1 gap-8">
        <div className="h-full flex flex-col gap-5">
          {children}
          {isConfirm && (
            <div className="text-sm opacity-50">
              {`Нажимая кнопку "Записаться", вы подтверждаете, что прочитали и соглашаетесь с `}
              <a href="https://storage.fast-day.ru/site-documents/terms_of_service_WEB111126.pdf" className="underline" target="_blank">Условия использования</a>
              {" и "}
              <a href="https://storage.fast-day.ru/site-documents/personal_data_processing_policy_WEB111126.pdf" className="underline" target="_blank">Политику обработки персональных данных</a> {" "}
              FastDay, а также даёте согласие на обработку ваших персональных данных в целях оформления и организации записи.
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
