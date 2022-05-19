import { useState, useEffect } from "react";
import BarChart from "./components/charts/barChart";
import "./App.css";
import { UserData } from "./store/fakeData";

import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";

// mds ws
import { commands, Status, Txpow, ws } from "@minima-global/mds-api";
import {
  BlockTimeState,
  updateBlockTime,
} from "./store/features/blocktime/blockTimeSlice";
import BlockTimeChart from "./components/charts/blockTimeChart";
import ChainWeightChart from "./components/charts/ChainWeightChart";
import RamTimeChart from "./components/charts/RamTimeChart";
import TXNPerBlockChart from "./components/charts/TXNPerBlockChart";
import { updateTXNPerBlock } from "./store/features/txnblock/txnBlockSlice";
import { updateRamTime } from "./store/features/ramtime/ramTimeSlice";
import { updateChainWeight } from "./store/features/chainweight/chainWeightSlice";
import { updateInfographs } from "./store/features/infographs/infographsSlice";

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
        label: "Time",
        data: blocktime.ms,
        backgroundColor: "#317aff",
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
            // data received from event
            const txpow: Txpow = data.txpow;

            commands.status().then((s: Status) => {
              // update ramtime chart
              dispatch(
                updateRamTime({
                  ram: s.memory.ram,
                  ms: txpow.header.timemilli,
                })
              );
              // update chain weight
              dispatch(
                updateChainWeight({
                  weight: s.chain.weight,
                  ms: txpow.header.timemilli,
                })
              );

              // update devices
              dispatch(
                updateInfographs({
                  devices: s.devices,
                  uptime: s.uptime,
                  ramusage: s.memory.ram,
                  diskusage: s.memory.disk,
                })
              );
            });

            // dispatch new data to the txnblock chart
            dispatch(
              updateTXNPerBlock({
                noOfTransactions: txpow.body.txnlist.length,
                blockHeight: txpow.header.block,
              })
            );

            // dispatch new data to the blockTime chart
            dispatch(
              updateBlockTime({
                blockHeight: txpow.header.block,
                ms: txpow.header.timemilli,
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
          label: "time",
          data: blocktime.ms, // y-axis
          backgroundColor: "#317aff",
        },
      ],
    });
  }, [blocktime]);

  return (
    <div className="App">
      <div style={{ width: 700, height: 700 }}>
        <BarChart barData={userData} />
        {/* 
        Add the four bunch of infographs about
        - Ram usage
        - Disk Usage
        - Uptime
        - Devices connected
        <BunchOfInfographs />
        */}
        <BlockTimeChart blockTimeData={blockTimeData} />
        <ChainWeightChart />
        <RamTimeChart />
        <TXNPerBlockChart />
        {/* 
        rest of charts...
        
        */}
      </div>
    </div>
  );
}

export default App;
