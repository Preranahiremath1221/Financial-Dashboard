"use client"

import { useCapacitor } from "@/hooks/use-capacitor"
import { useMobileApp } from "@/components/mobile-app-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { AumSipCards } from "@/components/aum-sip-cards"
import { TimeRangeFilter } from "@/components/time-range-filter"
import { StatCards } from "@/components/stat-cards"
import { ChartsSection } from "@/components/charts-section"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WifiOff } from "lucide-react"

export function MobileOptimizedDashboard() {
  const [timeRange, setTimeRange] = useState("7 Days")
  const [isOnline, setIsOnline] = useState(true)
  const { isNative, isKeyboardOpen, triggerHaptic } = useCapacitor()
  const { isMobile } = useMobileApp()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleTimeRangeChange = (newRange) => {
    if (isNative) {
      triggerHaptic()
    }
    setTimeRange(newRange)
  }

  return (
    <div className={`min-h-screen bg-background ${isKeyboardOpen ? "keyboard-open" : ""}`}>
      {/* Network status indicator for mobile */}
      {(isMobile || isNative) && !isOnline && (
        <Card className="mx-4 mt-2 border-destructive bg-destructive/10">
          <CardContent className="flex items-center gap-2 p-3">
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">Offline - Some features may be limited</span>
          </CardContent>
        </Card>
      )}

      <DashboardHeader timeRange={timeRange} />

      <main className={`container mx-auto px-4 py-6 space-y-6 ${isNative ? "pb-safe" : ""}`}>
        <AumSipCards timeRange={timeRange} />
        <TimeRangeFilter timeRange={timeRange} onTimeRangeChange={handleTimeRangeChange} />
        <StatCards timeRange={timeRange} />
        <ChartsSection timeRange={timeRange} />

        {/* Mobile app info */}
        {isNative && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Running as native mobile app</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
