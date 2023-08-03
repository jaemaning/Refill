import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedState {
  selected: string;
}

const initialState: SelectedState = {
  selected: "option1",
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    clearSelected: () => initialState,
  },
});

export const { setSelected, clearSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
