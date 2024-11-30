import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

export interface ScreenerState {
  loading: boolean;
  error: boolean;
  searchResults: [];
}

const initialState: ScreenerState = {
  loading: false,
  searchResults: [],
  error: false,
};

export const ScreenerSlice = createSlice({
  name: "screener",
  initialState,
  reducers: {
    reset: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(search.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(search.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const search = createAsyncThunk(
  "screener/search",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(BACKEND_URL + "/search/" + query, {
        data: { query: query },
      });
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Action creators are generated for each case reducer function
export const { reset } = ScreenerSlice.actions;

export default ScreenerSlice.reducer;
