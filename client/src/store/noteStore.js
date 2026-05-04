import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useNoteStore = create((set, get) => ({
  notes: [],
  isFetchingNotes: false,

  fetchNotes: async () => {
    set({ isFetchingNotes: true });
    try {
      const res = await axios.get(`${API_URL}/api/notes`, { withCredentials: true });
      set({ notes: res.data, isFetchingNotes: false });
    } catch (error) {
      set({ isFetchingNotes: false });
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching notes",
      };
    }
  },

  addNote: async (noteData) => {
    try {
      const res = await axios.post(`${API_URL}/api/notes`, noteData, { withCredentials: true });
      set({ notes: [...get().notes, res.data] });
      return { success: true, message: "Note added successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error adding note",
      };
    }
  },

  deleteNote: async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`, { withCredentials: true });
      set({ notes: get().notes.filter((note) => note._id !== id) });
      return { success: true, message: "Note deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting note",
      };
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const res = await axios.put(`${API_URL}/api/notes/${id}`, noteData, { withCredentials: true });
      set({
        notes: get().notes.map((note) => (note._id === id ? res.data : note)),
      });
      return { success: true, message: "Note updated successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error updating note",
      };
    }
  },
}));
