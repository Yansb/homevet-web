import { Toaster } from "sonner";
import { StoresProvider } from "./store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./router";

function App() {
  return (
    <StoresProvider>
      <Toaster />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </StoresProvider>
  );
}

export default App;
