import { createRoot } from "react-dom/client";

import "./index.css";
import "./config/firebaseConfig.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
