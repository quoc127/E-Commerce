
import { deleteImage, editImage, getAllImage, postImage } from "@/services/common-api/slide-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  imageSlideList: [],
};

export const getCommonAllImageSlide = createAsyncThunk(
  "/admin/get-all-image",
  async () => {
    const response = await getAllImage();
    return response.data;
  }
);

export const postCommonImage = createAsyncThunk(
  "/admin/add-image",
  async (formData, { rejectWithValue }) => {
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

export const deleteCommonImageSlide = createAsyncThunk(
  "/admin/delete-image",
  async (id) => {
    const response = await deleteImage(id);
    return response.data;
  }
);

export const editCommonImageSlide= createAsyncThunk(
  "/admin/edit-image-slide",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await editImage(id, formData);
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
      .addCase(getCommonAllImageSlide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommonAllImageSlide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = action.payload.data;
      })
      .addCase(getCommonAllImageSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = [];
      })
      .addCase(postCommonImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCommonImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = action.payload.data;
      })
      .addCase(postCommonImage.rejected, (state, action) => {
        state.isLoading = false;
        state.imageSlideList = [];
      });
  },
});

export default slideSlice.reducer;
