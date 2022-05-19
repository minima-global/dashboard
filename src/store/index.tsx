import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import blockTimeReducer from "./features/blocktime/blockTimeSlice";
import txnBlockReducer from "./features/txnblock/txnBlockSlice";
import ramTimeReducer from "./features/txnblock/txnBlockSlice";
import chainWeightReducer from "./features/chainweight/chainWeightSlice";
import infographsReducer from "./features/infographs/infographsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    blocktime: blockTimeReducer,
    txnblock: txnBlockReducer,
    ramtime: ramTimeReducer,
    chainweight: chainWeightReducer,
    infographs: infographsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
