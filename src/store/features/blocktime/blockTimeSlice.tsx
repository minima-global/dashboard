import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlockTimeState {
  blockHeight: string[];
  ms: string[];
}

const initialState: BlockTimeState = {
  blockHeight: [],
  ms: [],
};

interface UpdateBlockTimePayloadData {
  blockHeight: string;
  ms: string;
}
interface UpdateBlockTimePayload {
  type: string;
  payload: UpdateBlockTimePayloadData;
}

export const blockTimeSlice = createSlice({
  name: "blocktime",
  initialState,
  reducers: {
    updateBlockTime: (state, p: UpdateBlockTimePayload) => {
      // add block height
      state.blockHeight.push(p.payload.blockHeight);
      // add ms added ~ approximate for now
      state.ms.push(p.payload.ms);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBlockTime } = blockTimeSlice.actions;

export default blockTimeSlice.reducer;
