import { LoadingPage } from "@/components/layouts/LoadingPage";
import { useAuth } from "./AuthStore";
import { createContext, useContext } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useUsers } from "./UserStore";
import { useLocation } from "./LocationStore";

interface Stores {
  authStore: ReturnType<typeof useAuth>;
  userStore: ReturnType<typeof useUsers>;
  locationStore: ReturnType<typeof useLocation>;
}

const queryClient = new QueryClient();
const storesCtx = createContext<Stores | null>(null);

export function useStores(): Stores {
  const context = useContext(storesCtx);
  if (!context) {
    throw new Error("useStores must be used within a StoresProvider");
  }
  return context;
}

function StoresProviderContent({ children }: { children: React.ReactNode }) {
  const authStore = useAuth();
  const userStore = useUsers();
  const locationStore = useLocation();

  if (authStore.loading) {
    return <LoadingPage />;
  }

  return (
    <storesCtx.Provider value={{ authStore, userStore, locationStore }}>
      {children}
    </storesCtx.Provider>
  );
}

export function StoresProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoresProviderContent>{children}</StoresProviderContent>
    </QueryClientProvider>
  );
}
