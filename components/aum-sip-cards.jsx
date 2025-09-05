"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, FileText, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export function AumSipCards({ timeRange }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/dashboard?timeRange=${encodeURIComponent(timeRange)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <p className="text-red-600">Error loading AUM data: {error}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <p className="text-red-600">Error loading SIP data: {error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const aumData = data?.aum ? {
    value: `₹${data.aum.value.toLocaleString('en-IN')}`,
    change: data.aum.change,
    isPositive: data.aum.isPositive,
  } : {
    value: "₹0",
    change: "0%",
    isPositive: true,
  }

  const sipData = data?.sip ? {
    value: `₹${data.sip.value.toLocaleString('en-IN')}`,
    change: data.sip.change,
    isPositive: data.sip.isPositive,
  } : {
    value: "₹0",
    change: "0%",
    isPositive: true,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AUM Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary">Assets Under Management (AUM)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">{aumData.value}</p>
              <div className="flex items-center gap-2 mt-2">
                {aumData.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${aumData.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {aumData.change} MoM
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </CardContent>
      </Card>

      {/* SIP Card */}
      <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-accent">Systematic Investment Plan (SIP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-accent">{sipData.value}</p>
              <div className="flex items-center gap-2 mt-2">
                {sipData.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${sipData.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {sipData.change} MoM
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
