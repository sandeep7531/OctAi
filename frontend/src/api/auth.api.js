import api from "@/utils/axios";

export const loginWithFirebaseToken = async (token) => {
  const response = await api.post("/api/auth/login", { token });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};
