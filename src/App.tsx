import { useState, useEffect } from "react";
import BarChart from "./components/charts/barChart";
import "./App.css";
import { UserData } from "./store/fakeData";

// mds ws
import { commands, ws } from "@minima-global/mds-api";

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((d) => d.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((d) => d.userGain),
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
            // add newblock data to blocktime table in database
            break;
          case "MINING":
            // do nothing
            break;
          default:
          //console.error('Unknown event type: ', evt.event);
        }
      };
    }
  }, []);

  return (
    <div className="App">
      <div style={{ width: 700, height: 700 }}>
        <BarChart barData={userData} />
      </div>
    </div>
  );
}

export default App;
