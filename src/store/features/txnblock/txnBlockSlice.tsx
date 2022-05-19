import { createSlice } from "@reduxjs/toolkit";

export interface TXNPerBlockState {
  noOfTransactions: number[];
  blockHeight: string[];
}

const initialState: TXNPerBlockState = {
  noOfTransactions: [],
  blockHeight: [],
};

interface UpdateBlockTimePayloadData {
  noOfTransactions: number;
  blockHeight: string;
}
interface UpdateBlockTimePayload {
  type: string;
  payload: UpdateBlockTimePayloadData;
}

export const txnBlockSlice = createSlice({
  name: "txnblock",
  initialState,
  reducers: {
    updateTXNPerBlock: (state, p: UpdateBlockTimePayload) => {
      // add block height
      state.blockHeight.push(p.payload.blockHeight);
      // add number of transaction for this block height
      state.noOfTransactions.push(p.payload.noOfTransactions);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTXNPerBlock } = txnBlockSlice.actions;

export default txnBlockSlice.reducer;
