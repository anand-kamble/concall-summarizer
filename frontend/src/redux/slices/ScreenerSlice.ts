import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
    return [
      {
        id: 2726,
        name: "Reliance Industries Ltd",
        url: "/company/RELIANCE/consolidated/",
      },
      {
        id: 2809,
        name: "REC Ltd",
        url: "/company/RECLTD/consolidated/",
      },
      {
        id: 1274649,
        name: "Rail Vikas Nigam Ltd",
        url: "/company/RVNL/",
      },
      {
        id: 2620,
        name: "Radico Khaitan Ltd",
        url: "/company/RADICO/",
      },
      {
        id: 2693,
        name: "Ratnamani Metals & Tubes Ltd",
        url: "/company/RATNAMANI/consolidated/",
      },
      {
        id: 2662,
        name: "Ramkrishna Forgings Ltd",
        url: "/company/RKFORGE/consolidated/",
      },
      {
        id: 2719,
        name: "Relaxo Footwears Ltd",
        url: "/company/RELAXO/",
      },
      {
        id: 1284488,
        name: "R R Kabel Ltd",
        url: "/company/RRKABEL/",
      },
      {
        id: null,
        name: "Search everywhere: r",
        url: "/full-text-search/?q=r",
      },
    ];
  }
);

// Action creators are generated for each case reducer function
export const { reset } = ScreenerSlice.actions;

export default ScreenerSlice.reducer;
