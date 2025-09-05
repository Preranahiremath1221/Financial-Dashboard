"use client"

import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

export function SipBusinessChart({ timeRange }) {
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
        const transformedData = result.sipBusinessData.map((item) => ({
          month: item.month,
          purchaseAmount: item.sip,
          growth: item.business, // Using business as growth for now
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
          <CardTitle>SIP Business Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm text-gray-600">Loading SIP business data...</span>
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
          <CardTitle>SIP Business Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] flex items-center justify-center">
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
          <CardTitle>SIP Business Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] flex items-center justify-center">
            <div className="text-sm text-gray-600">No SIP business data available</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SIP Business Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            purchaseAmount: {
              label: "SIP Purchase Amounts (₹)",
              color: "#1f2937",
            },
            growth: {
              label: "MoM % Growth",
              color: "#ef4444",
            },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" stroke="#666" tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <YAxis yAxisId="right" orientation="right" stroke="#666" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
                        <p className="font-semibold text-gray-900">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.dataKey === 'growth' ? `${entry.value}%` : `₹${entry.value.toLocaleString()}`}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="purchaseAmount" fill="#1f2937" name="SIP Purchase Amounts (₹)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="growth"
                stroke="#ef4444"
                strokeWidth={3}
                name="MoM % Growth"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
