import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

// for options we will need the milliseconds to be formatted
// estimate how much data would be needed in the block/time
// before we start converting time to day by day?
// must start as hour, minute, second.. then as dataset gets larger
// adjust it
// maybe show just last 50 blocks/milliseconds which means
//

// options to customize the lineChart
const opts = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
  },
};

Chart.register(CategoryScale);
const BlockTimeChart = ({ blockTimeData }: any) => {
  return (
    <Line
      data={blockTimeData}
      options={opts}
      aria-label="Block vs Time Chart"
      role="img"
    />
  );
};

export default BlockTimeChart;
