import axios, { AxiosResponse } from "axios";
import qrCode from "qrcode";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//LogIn
export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const hash = "dummy";

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    const response = await api.post(
      "/api/v1/login",
      { email, password, hash },
      { withCredentials: true }
    );
    console.log("Login response:", response.data);

    console.log("Cookies:", document.cookie);

    const tokenCookie = response.headers?.["set-cookie"]?.find(
      (cookie: string) => cookie.startsWith("token=")
    );

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1].split(";")[0];
      localStorage.setItem("token", token);
      console.log("Token stored:", token);
    }

    return response;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
  }
};

//Logout
export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get("/api/v1/logout");
    console.log("Logout response:", response.data);

    localStorage.removeItem("token");

    return response;
  } catch (error: any) {
    console.error(
      "Logout failed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
//Forgot Password
export const forgotPasssword = async (
  email: string
): Promise<AxiosResponse> => {
  try {
    const response = await api.post("/password/forgot", { email });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Failed", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get All students (Admin)
export const getAdminStudentsData = async (): Promise<
  AxiosResponse<
    {
      id: number;
      name: string;
      email: string;
      number: number;
      rollNumber: number;
    }[]
  >
> => {
  try {
    const response = await api.get("api/v1/admin/students");

    return response;
  } catch (error: any) {
    console.error(
      "Failed to fetch students data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//Get Attendance Counts (Admin)
export const getAdminCounts = async (): Promise<
  AxiosResponse<
    {
      totalStudentsCount: number;
      presentStudentsCount: number;
      absentStudentsCount: number;
    }[]
  >
> => {
  try {
    const response = await axios.get("/api/v1/admin/counts");
    return response;
  } catch (error: any) {
    console.error(
      "Failed to fetch counts data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
//Get attendnace by day (admin)
export const getAdminDayData = async (): Promise<
  AxiosResponse<{
    length: number;
    attendanceList: any[];
  }>
> => {
  try {
    const response = await api.get("/api/v1/admin/day");
    return response;
  } catch (error: any) {
    console.error(
      "Failed to fetch admin/day data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//QR Code
export const qrcodegenerator = async (): Promise<
  AxiosResponse<
    {
      text: string;
    }[]
  >
> => {
  try {
    const response = await axios.get("/api/v1/attendance/qr");
    console.log(response);
    return response;
  } catch (error: any) {
    console.error(
      "Failed to fetch counts data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// const deviceId = ${navigator.userAgent}-${navigator.platform}-${window.screen.width}x${window.screen.height};
//   const hash = crypto.createHash('sha256');
//   hash.update(deviceId);
//   const hashHex = hash.digest('hex');

// ye hashHex ko daal dena email or password ke sath
