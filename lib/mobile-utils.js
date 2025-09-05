import { Capacitor } from "@capacitor/core"
import { Share } from "@capacitor/share"
import { Filesystem, Directory } from "@capacitor/filesystem"

export const shareContent = async (title, text, url) => {
  if (Capacitor.isNativePlatform()) {
    try {
      await Share.share({
        title,
        text,
        url,
        dialogTitle: "Share Dashboard Report",
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  } else {
    // Fallback for web
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }
}

export const saveFileToDevice = async (fileName, data, mimeType = "application/pdf") => {
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: data,
        directory: Directory.Documents,
      })
      return result.uri
    } catch (error) {
      console.error("Error saving file:", error)
      throw error
    }
  } else {
    // Fallback for web - trigger download
    const blob = new Blob([data], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

export const getDeviceInfo = () => {
  if (Capacitor.isNativePlatform()) {
    return {
      platform: Capacitor.getPlatform(),
      isNative: true,
      isWeb: false,
    }
  }
  return {
    platform: "web",
    isNative: false,
    isWeb: true,
  }
}
