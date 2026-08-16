import type { PropsWithChildren } from "react";

interface BaseLayoutProps extends PropsWithChildren {
  mainClassName?: string;
}

export const BaseLayout = ({ children, mainClassName="" }: BaseLayoutProps) => {
  return (
    <div className="flex flex-1 relative">

      <main className={`flex flex-col flex-1 1100:pb-0 pb-20 ${mainClassName}`}>
        <div className="px-5 md:px-8 py-8 flex flex-col flex-1">
          {children}
        </div>
      </main>

    </div>
  );
};