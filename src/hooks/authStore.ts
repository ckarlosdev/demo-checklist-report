import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("auth_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  isAuthenticated: !!localStorage.getItem("auth_token"),

  // token:
  //   "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhM2EzYmI4NS04YzMzLTQ5OGYtYmI4Mi04NGI5YjA1MGExMWYiLCJlbWFpbCI6ImNyYW1pcmV6QGhtYnJhbmR0LmNvbSIsInN1YiI6ImEzYTNiYjg1LThjMzMtNDk4Zi1iYjgyLTg0YjliMDUwYTExZiIsImlhdCI6MTc3MDMyMTkzNywiZXhwIjoxNzcwMzIyODM3fQ.2TgfP6cKgV47oPtNzdMju5QqFmKOoYg5rl4iKl5CU9A",
  // refreshToken: "1e32b2b3-54bb-4fab-8d0c-b04ed597a2b4",
  // isAuthenticated: true,

  user: null,

  setRefreshToken: (refreshToken: string) => {
    set({ refreshToken });
  },

  login: (token: string, refreshToken: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    set({ token, refreshToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    set({
      token: null,
      isAuthenticated: false,
      user: null,
      refreshToken: null,
    });
  },

  setUser: (user) => set({ user }),
}));
