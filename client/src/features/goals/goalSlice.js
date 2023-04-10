import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// creates initial state
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new goal
export const createGoal = createAsyncThunk(
  "goal/create",
  async (goalData, thunkAPI) => {
    try {
    } catch (error) {}
  }
);

export const GoalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = GoalSlice.actions;
export default GoalSlice.reducer;
