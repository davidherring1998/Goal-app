// for making the request
import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
// axios puts the response in a variable named data
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
