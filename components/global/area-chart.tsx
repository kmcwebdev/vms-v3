import type { ChartData, ChartOptions } from "chart.js";
import {
  LineElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineChart } from "react-chartjs-2";

interface AreaChartProps {
  options?: ChartOptions<"line">;
  data: ChartData<"line">;
  height?: string;
  width?: string;
  fallbackContent?: React.ReactNode;
}

const AreaChart = ({
  data,
  options,
  height,
  width,
  fallbackContent,
}: AreaChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );

  return (
    <LineChart
      data={data}
      options={options}
      height={height}
      width={width}
      fallbackContent={fallbackContent}
    />
  );
};

export default AreaChart;
