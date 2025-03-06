import { Router } from "./app/routes";
import { StoresProvider } from "./store";

function App() {
  return (
    <StoresProvider>
      <Router />
    </StoresProvider>
  );
}

export default App;
