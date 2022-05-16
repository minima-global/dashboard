import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
const BarChart = ({ barData }: any) => {
  return <Bar data={barData} />;
};

export default BarChart;
