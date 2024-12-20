import {
  getCheckAuth,
  patchChangePassword,
  patchResetPassword,
  postAuthLogin,
  postAuthLogout,
  postAuthRegister,
  postForgotPassword,
} from "@/services/auth-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/user/register",
  async ({ userName, email, password }) => {
    const response = await postAuthRegister(userName, email, password);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/user/login",
  async ({ email, password }) => {
    const response = await postAuthLogin(email, password);
    if (response.data.success) {
      localStorage.setItem('accessToken', response.data.token);
    }
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("/user/logout", async () => {
  const response = await postAuthLogout();
  localStorage.removeItem('accessToken');
  return response.data;
});

export const checkAuth = createAsyncThunk("/user/checkauth", async () => {
  const response = await getCheckAuth();
  return response.data;
});

export const changePasswordUser = createAsyncThunk(
  "/user/change-password",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await patchChangePassword(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "/user/forgot-password",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await postForgotPassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "/user/reset-password",
  async ({ otp, password }, { rejectWithValue }) => {
    try {
      const response = await patchResetPassword(otp, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(changePasswordUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(changePasswordUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
