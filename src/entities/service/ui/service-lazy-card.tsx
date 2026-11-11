import { Card, CardContent, Skeleton } from "@/shared/ui"

export const ServiceLazyCard = () => {
  return (
    <Card>
      <CardContent className="px-4 py-3.75 grid gap-5">
        <div className="flex items-center gap-3.75 w-full">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <div className="grid flex-1 gap-1.75">

            <Skeleton className="w-1/3 h-5 rounded-lg" />

            <div className="flex items-center gap-3">
              <Skeleton className="w-14 h-4 rounded-lg" />
              <Skeleton className="w-11 h-4 rounded-lg" />
            </div>
          </div>

            <Skeleton className="w-11 h-11 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}
