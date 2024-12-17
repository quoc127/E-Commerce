import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const postAuthRegister = (userName, email, password) => {
  return axios.post(
    `${serverUrl}/user/register`,
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
    `${serverUrl}/user/login`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const postAuthLogout = () => {
  return axios.post(
    `${serverUrl}/user/logout`,
    {},
    { withCredentials: true }
  );
};

export const getCheckAuth = () => {
  return axios.get(`${serverUrl}/user/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
};

export const patchChangePassword = (email, password) => {
  return axios.patch(
    `${serverUrl}/user/change-password`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const postForgotPassword = (email) => {
  return axios.post(
    `${serverUrl}/user/forgot-password`,
    {
      email: email,
    },
    {
      withCredentials: true,
    }
  );
};

export const patchResetPassword = (otp, password) => {
  return axios.patch(
    `${serverUrl}/user/reset-password`,
    {
      otp: otp,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};
