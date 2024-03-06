import axiosInstance from "./axiosconfig";

const loginUser = async (payload: any) => {
  console.log(payload);
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
};

const registerUser = async (payload: any) => {
  const response = await fetch("https://reqres.in/api/register", {
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
  loginUser,
  registerUser,
};
