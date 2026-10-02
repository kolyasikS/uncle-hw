import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Admin } from "@/lib/entities/admin";

interface AdminState {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
  clearAdmin: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: null }),
    }),
    {
      name: "admin-store", // Unique key in localStorage
      partialize: (state) => ({ admin: state.admin }), // Excludes actions and unwanted properties
      storage: createJSONStorage(() => localStorage), // (Optional) defaults to localStorage
    },
  ),
);
