import type { PropsWithChildren } from "react";

interface BaseLayoutProps extends PropsWithChildren {
  mainClassName?: string;
}

export const BaseLayout = ({ children, mainClassName="" }: BaseLayoutProps) => {
  return (
    <div className="flex flex-1 relative">

      <main className={`flex flex-col flex-1 ${mainClassName}`}>
        <div className="px-5 py-10 md:px-6 md:py-6 flex flex-col flex-1">
          {children}
        </div>
      </main>

    </div>
  );
};