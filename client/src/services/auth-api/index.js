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
    );
};
