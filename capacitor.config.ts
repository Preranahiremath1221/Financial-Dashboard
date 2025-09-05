import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.financialdashboard.app",
  appName: "Financial Dashboard",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#164e63",
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
    App: {
      launchUrl: "com.financialdashboard.app",
    },
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
  ios: {
    contentInset: "automatic",
    scrollEnabled: true,
    allowsLinkPreview: false,
  },
}

export default config
