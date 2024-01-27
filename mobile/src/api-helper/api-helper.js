import axios from "axios";

const api = axios.create({
  baseURL: "172.27.160.1:5000",
});

//login
export const login = async (email, password) => {
  try {
    const hash = "dummy";
    const obj = { email, password, hash };
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await api.post("/api/v1/login", obj, config);
    return response;
  } catch (error) {
    console.error("Error in login:", error.message);
    throw error;
  }
};

//Scan QR
export const scanQR = async (studentId, hash) => {
  try {
    const scanvalues = { studentId, hash };
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await api.post("/api/v1/scanQR", scanvalues, config);
    return response;
  } catch (error) {
    console.error("Error in scanQR:", error.message);
    throw error;
  }
};
