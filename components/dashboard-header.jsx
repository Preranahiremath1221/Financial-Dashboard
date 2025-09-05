"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BarChart3,
  Shield,
  Building2,
  Coins,
  TrendingUp,
  Search,
  CreditCard,
  Target,
  FileText,
  FileBarChart,
  Menu,
  Moon,
  Sun,
  Download,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { generateDashboardPDF } from "@/lib/pdf-generator"

const navigationItems = [
  { name: "CRM", icon: Building2 },
  { name: "Utilities", icon: BarChart3 },
  { name: "Insurance", icon: Shield },
  { name: "Assets", icon: Coins },
  { name: "Mutual", icon: TrendingUp },
  { name: "Research", icon: Search },
  { name: "Transact Online", icon: CreditCard },
  { name: "Goal GPS", icon: Target },
  { name: "Financial Planning", icon: FileText },
  { name: "Wealth Report", icon: FileBarChart },
  { name: "Other", icon: Menu },
]

export function DashboardHeader({ timeRange }) {
  const { theme, setTheme } = useTheme()
  const [activeNav, setActiveNav] = useState("CRM")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handlePDFDownload = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateDashboardPDF(timeRange)
    } catch (error) {
      console.error("Failed to generate PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar with logo, PDF button and theme toggle */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">WealthDash</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handlePDFDownload}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="pb-4">
          <Card className="p-2">
            <div className="flex flex-wrap gap-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.name}
                    variant={activeNav === item.name ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setActiveNav(item.name)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Button>
                )
              })}
            </div>
          </Card>
        </nav>
      </div>
    </header>
  )
}
