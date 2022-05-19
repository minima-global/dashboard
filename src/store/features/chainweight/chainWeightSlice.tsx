import { createSlice } from "@reduxjs/toolkit";

export interface ChainWeightState {
  weight: number[];
  ms: string[];
}

const initialState: ChainWeightState = {
  weight: [],
  ms: [],
};

interface UpdateChainWeightPayloadData {
  weight: number;
  ms: string;
}
interface UpdateChainWeightPayload {
  type: string;
  payload: UpdateChainWeightPayloadData;
}

export const chainWeightSlice = createSlice({
  name: "chainweight",
  initialState,
  reducers: {
    updateChainWeight: (state, p: UpdateChainWeightPayload) => {
      // add block height
      state.weight.push(p.payload.weight);
      // add ms added ~ approximate for now
      state.ms.push(p.payload.ms);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateChainWeight } = chainWeightSlice.actions;

export default chainWeightSlice.reducer;
