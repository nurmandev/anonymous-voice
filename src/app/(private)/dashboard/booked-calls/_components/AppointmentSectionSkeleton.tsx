import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AppointmentSectionSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-7 w-[180px]" />
      <Skeleton className="h-4 w-[240px] mt-2" />
    </CardHeader>
    <CardContent>
      {[1, 2].map((i) => (
        <div key={i} className="mb-4">
          <div className="flex items-center gap-4 mb-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
