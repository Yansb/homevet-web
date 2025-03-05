import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from "./app/routes.tsx"

createRoot(document.getElementById('root')!).render(
  <Router />
)
