import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/Api";
import axios from "axios";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user") as string) || null,
  inputs: {},
  loading: false,
};

const asyncLogin = createAsyncThunk(
  "currentUser/login",
  async (action: any) => {
    console.log(action);

    const res = await axios.post(API_ENDPOINTS.LOGIN, action.payload.inputs);
    return res.data;
  }
);

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = asyncLogin(action);
    },
    logout: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.loading = false;
      state.currentUser = null;
      console.log(action.error.message);
    });
  },
});

export default CurrentUserSlice.reducer;
export const { login } = CurrentUserSlice.actions;
