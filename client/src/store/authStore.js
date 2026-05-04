import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  signup: async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, userData, { withCredentials: true });
      set({ authUser: res.data.user });
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error signing up",
      };
    }
  },

  login: async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, userData, { withCredentials: true });
      set({ authUser: res.data.user });
      return { success: true, message: "Logged in successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error logging in",
      };
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      set({ authUser: null });
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error logging out",
      };
    }
  },

  authCheck: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/authCheck`, { withCredentials: true });
      set({ authUser: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
      return{
        message: error.response?.data?.message
      }
    }
  },
}));
