import { getAllImage, postImage } from "@/services/admin-api/slide-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  imageSlideList: [],
};

export const getAdminAllImageSlide = createAsyncThunk(
  "/admin/get-all-image",
  async () => {
    const response = await getAllImage();
    return response.data;
  }
);

export const postAdminImage = createAsyncThunk(
  "/admin/add-product",
  async (formData, { rejectWithValue }) => {
    console.log("formData", formData);

    try {
      const response = await postImage(formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const slideSlice = createSlice({
  name: "adminSlide",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAllImageSlide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminAllImageSlide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = action.payload.data;
      })
      .addCase(getAdminAllImageSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = [];
      })
      .addCase(postAdminImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postAdminImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = action.payload.data;
      })
      .addCase(postAdminImage.rejected, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = [];
      });
  },
});

export default slideSlice.reducer;
