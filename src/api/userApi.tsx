import axiosInstance from "./axiosconfig";

const fetchALLUser = async () => {
  return await axiosInstance.get("/users");
};

const createUser = async (payload: any) => {
  const response = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
};

export default {
  fetchALLUser,
  createUser,
};
