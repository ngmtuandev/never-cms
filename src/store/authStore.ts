import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of the store's state and actions
interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    clearToken: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: string | null) => set({ token }),
            clearToken: () => set({ token: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;