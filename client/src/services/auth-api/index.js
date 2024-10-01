import axios from "axios";

export const postAuthRegister = (userName, email, password) => {
  return axios
    .post(
      "http://localhost:5000/api/user/register",
      {
        userName: userName,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("API Response:", response.data); // Debug API response
      return response;
    })
    .catch((error) => {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      ); // Debug error from API
      throw error; // Re-throw the error to be handled by createAsyncThunk
    });
};
