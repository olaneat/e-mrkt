import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"



const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: 1
      
    }
  }
})


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

// In your main entry file (index.tsx / main.tsx / App entry point)
if ("serviceWorker" in navigator) {
  // Wait for the page to be fully loaded before registering
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" }) // optional: scope
      .then((registration) => {
        console.log("Service Worker Registered Successfully! 🎉", registration.scope);

        // Optional: Listen for updates (very useful during development)
        registration.addEventListener("updatefound", () => {
          console.log("New Service Worker found, installing...");
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then(() => console.log("Service Worker Registered ✓"))
//       .catch(err => console.error("SW registration failed:", err))
//   })
// }

