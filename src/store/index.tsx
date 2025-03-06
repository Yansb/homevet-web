import { useAuth } from "./AuthStore";
import { createContext, useContext } from "react";

interface Stores {
  authStore: ReturnType<typeof useAuth>;
}

const storesCtx = createContext<Stores | null>(null);

export function useStores(): Stores {
  const context = useContext(storesCtx);
  if (!context) {
    throw new Error("useStores must be used within a StoresProvider");
  }
  return context;
}

export function StoresProvider({ children }: { children: React.ReactNode }) {
  const authStore = useAuth();

  if (authStore.loading) {
    return <div>Loading...</div>;
  }

  return (
    <storesCtx.Provider value={{ authStore }}>{children}</storesCtx.Provider>
  );
}
