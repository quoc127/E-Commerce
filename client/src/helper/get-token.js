export const getToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};
