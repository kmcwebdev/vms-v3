import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "chart.js";
import AreaChart from "@/components/global/area-chart";
import { useGetVisitorCounts } from "@/hooks/visitors/useGetVisitorCounts";

const VisitorCount = () => {
  const {} = useGetVisitorCounts("daily", {
    site_ids:
      "f127db90-9830-4d5e-a862-614beea6e389,b18a50f9-be1e-4bf5-a089-b40a3f641f6a",
  });

  const visitorPerWeekGraphData = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Visitors per week",
        data: [12, 19, 3, 5, 2, 3, 4],
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="col-span-2 row-span-2 shadow-none">
      <CardContent>
        <CardHeader className="px-0">
          <CardTitle>Visitors this week</CardTitle>
        </CardHeader>
        <AreaChart
          height="120"
          data={visitorPerWeekGraphData as ChartData<"line">}
          options={{
            backgroundColor: "#f97315",
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                border: {
                  dash: [4, 8],
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default VisitorCount;
