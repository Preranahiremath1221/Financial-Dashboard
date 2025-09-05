"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, ArrowDownCircle, XCircle, AlertTriangle, Plus, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export function StatCards({ timeRange }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/dashboard-data?timeRange=${encodeURIComponent(timeRange)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch stats data')
        }
        const result = await response.json()
        setData(result.statsData)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-8 text-center">
              <p className="text-red-600">Error loading stats: {error}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Purchases",
      value: data?.purchases?.toLocaleString() || "0",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Redemptions",
      value: data?.redemptions?.toLocaleString() || "0",
      icon: ArrowDownCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Rejected Transactions",
      value: data?.rejectedTransactions?.toLocaleString() || "0",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "SIP Rejections",
      value: data?.sipRejections?.toLocaleString() || "0",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "New SIP",
      value: data?.newSip?.toLocaleString() || "0",
      icon: Plus,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
