"use client"

import { useEffect, useState } from "react"
import { Capacitor } from "@capacitor/core"
import { StatusBar, Style } from "@capacitor/status-bar"
import { Keyboard } from "@capacitor/keyboard"
import { App } from "@capacitor/app"
import { Haptics, ImpactStyle } from "@capacitor/haptics"

export function useCapacitor() {
  const [isNative, setIsNative] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [appState, setAppState] = useState("active")

  useEffect(() => {
    const checkPlatform = () => {
      setIsNative(Capacitor.isNativePlatform())
    }

    checkPlatform()

    if (Capacitor.isNativePlatform()) {
      // Configure status bar
      StatusBar.setStyle({ style: Style.Dark })
      StatusBar.setBackgroundColor({ color: "#164e63" })

      // Keyboard listeners
      const keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
        setIsKeyboardOpen(true)
      })

      const keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
        setIsKeyboardOpen(false)
      })

      // App state listeners
      const appStateChange = App.addListener("appStateChange", ({ isActive }) => {
        setAppState(isActive ? "active" : "background")
      })

      // Cleanup listeners
      return () => {
        keyboardWillShow.remove()
        keyboardWillHide.remove()
        appStateChange.remove()
      }
    }
  }, [])

  const triggerHaptic = async (style = ImpactStyle.Medium) => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style })
    }
  }

  const hideKeyboard = async () => {
    if (Capacitor.isNativePlatform()) {
      await Keyboard.hide()
    }
  }

  return {
    isNative,
    isKeyboardOpen,
    appState,
    triggerHaptic,
    hideKeyboard,
  }
}
