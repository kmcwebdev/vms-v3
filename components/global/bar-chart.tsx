import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar as BarChartInterface } from "react-chartjs-2";

interface BarProps {
  options?: ChartOptions<"bar">;
  data: ChartData<"bar">;
  height?: string;
  width?: string;
  fallbackContent?: React.ReactNode;
}

const BarChart = ({
  data,
  options,
  height,
  width,
  fallbackContent,
}: BarProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Filler,
  );

  return (
    <BarChartInterface
      data={data}
      options={options}
      height={height}
      width={width}
      fallbackContent={fallbackContent}
    />
  );
};

export default BarChart;
