import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
