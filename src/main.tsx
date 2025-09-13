import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { worker } from "./mocks/browser";

async function deferRender() {
	const { worker } = await import("./mocks/browser.ts");
	return worker.start();
}

deferRender().then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
});