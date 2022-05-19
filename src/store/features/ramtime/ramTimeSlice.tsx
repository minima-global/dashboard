import { createSlice } from "@reduxjs/toolkit";

export interface RamTimeState {
  ram: string[];
  ms: string[];
}

const initialState: RamTimeState = {
  ram: [],
  ms: [],
};

interface UpdateRamTimePayloadData {
  ram: string;
  ms: string;
}
interface UpdateRamTimePayload {
  type: string;
  payload: UpdateRamTimePayloadData;
}

export const ramTimeSlice = createSlice({
  name: "ramtime",
  initialState,
  reducers: {
    updateRamTime: (state, p: UpdateRamTimePayload) => {
      // add block height
      state.ram.push(p.payload.ram);
      // add ms added ~ approximate for now
      state.ms.push(p.payload.ms);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateRamTime } = ramTimeSlice.actions;

export default ramTimeSlice.reducer;
