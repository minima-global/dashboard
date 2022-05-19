import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import "chartjs-adapter-moment";
import {
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import moment from "moment";

/** wish chartjs gave more indications.. -__- */
/** Register the chartjs-moment-adapter adapters to work with the Charts */
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// for options we will need the milliseconds to be formatted
// estimate how much data would be needed in the block/time
// before we start converting time to day by day?
// must start as hour, minute, second.. then as dataset gets larger
// adjust it
// maybe show just last 50 blocks/milliseconds which means
//
const options = {};

const BlockTimeChart = ({ blockTimeData }: any) => {
  return (
    <Line
      data={blockTimeData}
      options={{
        responsive: true,
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function (tickValue: any) {
                let t = moment(tickValue).format("HH:mm:ss");

                return t;
              },
            },
            title: {
              display: true,
              text: "time",
              color: "#317aff",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let t = moment(context.parsed.y).format("HH:mm:ss");

                let label = "Mined at " + t;

                return label;
              },
              labelColor: function (context) {
                return {
                  borderColor: "#fff",
                  backgroundColor: "#317aff",
                  borderWidth: 1,
                  borderRadius: 1,
                };
              },
              labelTextColor: function (context) {
                return "#fafaff";
              },
            },
          },
        },
      }}
    />
  );
};

export default BlockTimeChart;
