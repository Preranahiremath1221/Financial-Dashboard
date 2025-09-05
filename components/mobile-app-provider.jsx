"use client"

import { createContext, useContext, useEffect, useState } from "react"

const MobileAppContext = createContext({
  isMobile: false,
  isKeyboardOpen: false,
})

export function MobileAppProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    // Check if running in Capacitor
    const checkMobile = () => {
      const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isCapacitor = window.Capacitor !== undefined
      setIsMobile(isMobileDevice || isCapacitor)
    }

    checkMobile()

    // Handle keyboard events for mobile
    const handleResize = () => {
      if (isMobile) {
        const heightDiff = window.screen.height - window.innerHeight
        setIsKeyboardOpen(heightDiff > 150)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      document.body.classList.add("mobile-app-container", "is-mobile")
    }
    if (isKeyboardOpen) {
      document.body.classList.add("keyboard-open")
    } else {
      document.body.classList.remove("keyboard-open")
    }

    return () => {
      document.body.classList.remove("mobile-app-container", "is-mobile", "keyboard-open")
    }
  }, [isMobile, isKeyboardOpen])

  return <MobileAppContext.Provider value={{ isMobile, isKeyboardOpen }}>{children}</MobileAppContext.Provider>
}

export const useMobileApp = () => useContext(MobileAppContext)
