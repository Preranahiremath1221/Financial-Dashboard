"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

export function MonthlyMisChart({ timeRange }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/dashboard-data?timeRange=${encodeURIComponent(timeRange)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        // Transform data to match chart keys
        const transformedData = result.monthlyMisData.map((item) => ({
          month: item.month,
          purchases: item.equity,
          redemptions: item.debt,
          newSip: item.hybrid,
        }))
        setData(transformedData)
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
      <Card>
        <CardHeader>
          <CardTitle>Monthly MIS Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm text-gray-600">Loading monthly MIS data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly MIS Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-600">Error loading data: {error}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly MIS Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-sm text-gray-600">No monthly MIS data available</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly MIS Report</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            purchases: {
              label: "Purchases",
              color: "#ef4444",
            },
            redemptions: {
              label: "Redemptions",
              color: "#3b82f6",
            },
            newSip: {
              label: "New SIP",
              color: "#10b981",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
                        <p className="font-semibold text-gray-900 mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}:{" "}
                            {entry.dataKey === "newSip"
                              ? entry.value
                              : `₹${(entry.value / 1000).toFixed(0)}K`}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="purchases" stroke="#ef4444" strokeWidth={2} name="Purchases" />
              <Line type="monotone" dataKey="redemptions" stroke="#3b82f6" strokeWidth={2} name="Redemptions" />
              <Line type="monotone" dataKey="newSip" stroke="#10b981" strokeWidth={2} name="New SIP" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
