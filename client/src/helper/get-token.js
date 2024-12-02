export const getToken = () => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }

  return null;
};
