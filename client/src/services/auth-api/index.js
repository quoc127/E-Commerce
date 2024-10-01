import axios from "axios";

export const postAuthRegister = (userName, email, password) => {
  return axios.post(
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

export const postAuthLogin = (email, password) => {
  return axios.post(
    "http://localhost:5000/api/user/login",
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const getCheckAuth = () => {
  return axios.get("http://localhost:5000/api/user/check-auth", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
};
