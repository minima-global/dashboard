import { createSlice } from "@reduxjs/toolkit";

export interface InfographsState {
  devices: number;
  ramusage: string;
  diskusage: string;
  uptime: string;
}

const initialState: InfographsState = {
  devices: 0,
  ramusage: "",
  diskusage: "",
  uptime: "",
};

interface UpdateInfographsPayloadData {
  devices: number;
  ramusage: string;
  diskusage: string;
  uptime: string;
}
interface UpdateInfographsPayload {
  type: string;
  payload: UpdateInfographsPayloadData;
}

export const infographsSlice = createSlice({
  name: "infographs",
  initialState,
  reducers: {
    updateInfographs: (state, p: UpdateInfographsPayload) => {
      state.devices = p.payload.devices;
      state.diskusage = p.payload.diskusage;
      state.ramusage = p.payload.ramusage;
      state.uptime = p.payload.uptime;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateInfographs } = infographsSlice.actions;

export default infographsSlice.reducer;
