import { StrictMode, useLayoutEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { Moon, Sun } from "lucide-react"

import "./index.css"
import { RouterProvider } from "react-router-dom"
import router from "./router.tsx"

const THEME_KEY = "clinic-demo:theme"

const ToggleDarkButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) !== "light"
    } catch {
      return true
    }
  })

  useLayoutEffect(() => {
    const theme = isDarkMode ? "dark" : "light"
    document.documentElement.classList.toggle("dark", isDarkMode)
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      return
    }
  }, [isDarkMode])

  return (
    <button
      type="button"
      onClick={() => setIsDarkMode(dark => !dark)}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-white hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 sm:top-6 sm:right-6"
      aria-label="Dark mode"
      aria-pressed={isDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun aria-hidden="true" className="w-5 h-5" /> : <Moon aria-hidden="true" className="w-5 h-5" />}
    </button>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToggleDarkButton />
    <RouterProvider router={router} />
  </StrictMode>
)
