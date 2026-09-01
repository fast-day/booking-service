import { Card, CardContent } from "@/shared/ui"

export const SlotCard = () => {
  return (
    <Card className="cursor-pointer hover:bg-primary/10 duration-200">
      <CardContent className="px-4 py-3.75 grid gap-5">
        slot
      </CardContent>
    </Card>
  )
}
