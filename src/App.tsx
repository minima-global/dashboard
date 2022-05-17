import { useState, useEffect } from "react";
import BarChart from "./components/charts/barChart";
import "./App.css";
import { UserData } from "./store/fakeData";

import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";

// mds ws
import { commands, ws } from "@minima-global/mds-api";
import {
  BlockTimeState,
  updateBlockTime,
} from "./store/features/blocktime/blockTimeSlice";
import BlockTimeChart from "./components/charts/blockTimeChart";

function App() {
  console.log(`Rendering App.tsx`);

  const dispatch = useAppDispatch();
  const blocktime: BlockTimeState = useSelector(
    (root: RootState) => root.blocktime
  );

  console.log("blocktime data", blocktime);

  const [userData, setUserData] = useState({
    labels: UserData.map((d) => d.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((d) => d.userGain),
      },
    ],
  });

  const [blockTimeData, setBlockTimeData] = useState({
    labels: blocktime.blockHeight,
    datasets: [
      {
        // label: "Block vs Time",
        data: blocktime.ms,
      },
    ],
  });

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt: any) => {
        let data = JSON.parse(evt.data);
        console.log("Minima Event", data);
        const event = data.event;
        data = data.data;
        switch (event) {
          case "NEWBALANCE":
            break;
          case "NEWBLOCK":
            console.log(`Newblock event.`);
            // dispatch new data to the blockTime chart
            dispatch(
              updateBlockTime({
                blockHeight: data.txpow.header.block,
                ms: data.txpow.header.timemilli,
              })
            );
            break;
          case "MINING":
            // do nothing
            break;
          default:
          //console.error('Unknown event type: ', evt.event);
        }
      };
    }

    setBlockTimeData({
      labels: blocktime.blockHeight, // x-axis
      datasets: [
        {
          data: blocktime.ms, // y-axis
        },
      ],
    });
  }, [blocktime]);

  return (
    <div className="App">
      <div style={{ width: 700, height: 700 }}>
        <BarChart barData={userData} />
        <BlockTimeChart blockTimeData={blockTimeData} />
        <div>Last {blocktime.blockHeight.length} blocks</div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
