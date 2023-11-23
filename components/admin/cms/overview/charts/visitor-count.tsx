import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "chart.js";
import AreaChart from "@/components/global/area-chart";
import { useGetVisitorCounts } from "@/hooks/visitors/useGetVisitorCounts";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createSearchParams } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type DateTrunc = "daily" | "weekly" | "monthly";

const weeklyChartLabel = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const monthlyChartLabel = ["Month"];

const VisitorCount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const visitorFiltersForm = useForm();

  const filter = searchParams.has("filter")
    ? (searchParams.get("filter") as DateTrunc)
    : "daily";

  const { data: visitorCounts } = useGetVisitorCounts(filter);

  const visitorCountData = visitorCounts
    ? visitorCounts.map((item) => item.visitor_count)
    : [];

  const visitorCountLabelForDaily = visitorCounts
    ? visitorCounts.map((item) => item.formatted_date)
    : [];

  const visitorCountLabel =
    searchParams.has("filter") &&
    searchParams.get("filter")?.toString() === "monthly"
      ? monthlyChartLabel
      : searchParams.get("filter")?.toString() === "weekly"
      ? weeklyChartLabel
      : visitorCountLabelForDaily;

  const visitorPerWeekGraphData = {
    labels: visitorCountLabel,
    datasets: [
      {
        label: `Visitors per ${
          searchParams.has("filter")
            ? searchParams.get("filter")?.toString()
            : "daily"
        } basis`,
        data: visitorCountData,
        tension: 0.4,
      },
    ],
  };

  const onSubmitHandler = () => {
    console.log("test", visitorFiltersForm.getValues(), visitorCounts);
  };

  return (
    <Card className="col-span-2 row-span-2 shadow-none">
      <CardContent>
        <CardHeader className="flex flex-row  items-center justify-between px-0">
          <CardTitle>
            Visitors count{" "}
            {searchParams.has("filter")
              ? searchParams.get("filter")?.toString()
              : "daily"}
          </CardTitle>
          <Form
            name="visitorFiltersForm"
            useFormReturn={visitorFiltersForm}
            onSubmit={onSubmitHandler}
          >
            <Form.Combobox
              onSelect={(e) => {
                const newSearchParams = createSearchParams({ filter: e });

                if (newSearchParams) {
                  router.replace(
                    `${window.location.pathname}?${newSearchParams.toString()}`,

                    { scroll: false },
                  );
                }
              }}
              name="data"
              placeholder="Filter by"
              data={[
                {
                  label: "Daily",
                  value: "daily",
                },
                {
                  label: "Weekly",
                  value: "weekly",
                },
                {
                  label: "Monthly",
                  value: "monthly",
                },
              ]}
            />
          </Form>
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
