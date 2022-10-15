import { FC } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels);

interface BarChartProps {
  isVertical: boolean;
  data: { [label: string]: number };
}

export const BarChart: FC<BarChartProps> = ({ data, isVertical }) => {
  const indexAxis = isVertical ? "y" : "x";
  const oppositeAxis = isVertical ? "x" : "y";

  return (
    <>
      <Bar
        options={{
          indexAxis,
          responsive: true,
          plugins: {
            datalabels: {
              align: "end",
              anchor: "end",
              color: "white",
              backgroundColor: "black",
              borderWidth: 5,
              borderRadius: 5,
            },
          },
          layout: {
            padding: {
              right: 30,
            },
          },
          scales: {
            [oppositeAxis]: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                display: false,
              },
              grid: {
                lineWidth: 0,
              },
              suggestedMax: Math.max(...Object.values(data)) + 1,
            },
            [indexAxis]: {
              grid: {
                lineWidth: 0,
              },
            },
          },
        }}
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(9, 180, 20, 0.75)",
              indexAxis,
            },
          ],
        }}
      />
    </>
  );
};
