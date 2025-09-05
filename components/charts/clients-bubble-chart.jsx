"use client"

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{data.name}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Age: {data.age} years</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Investment: ₹{(data.investment / 1000).toFixed(0)}K</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">AUM: ₹{(data.aum / 1000).toFixed(0)}K</p>
      </div>
    )
  }
  return null
}

const CustomDot = (props) => {
  const { cx, cy, payload } = props
  // Adjust radius scaling to better match image bubble sizes
  const radius = Math.sqrt(payload.aum) / 150
  // Use fixed colors matching the image's bubble colors
  const colors = ["#FF4500", "#FF6347", "#FF8C00", "#32CD32", "#FFD700"]
  const color = colors[payload.index % colors.length] || "#8884d8"

  // Draw a big circle with smaller circles inside to mimic client's image style
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={color} fillOpacity={0.9} />
      <circle cx={cx - radius / 3} cy={cy - radius / 3} r={radius / 3} fill="#fff" fillOpacity={0.7} />
      <circle cx={cx + radius / 3} cy={cy + radius / 3} r={radius / 4} fill="#fff" fillOpacity={0.7} />
    </g>
  )
}


export function ClientsBubbleChart({ timeRange }) {
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
        const transformedData = result.clientsData.map((item, index) => ({
          age: item.x,
          investment: item.y * 1000, // Scale up
          aum: item.z * 10000, // Scale up
          name: item.name,
          index
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
          <CardTitle>Clients Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm text-gray-600">Loading client data...</span>
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
          <CardTitle>Clients Distribution</CardTitle>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            age: {
              label: "Client Age",
              color: "#FF4500",
            },
            investment: {
              label: "Investment Value",
              color: "#32CD32",
            },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                type="number"
                dataKey="age"
                name="Age"
                stroke="#666"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <YAxis
                type="number"
                dataKey="investment"
                name="Investment"
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                stroke="#666"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 10000', 'dataMax + 10000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Clients" data={data} shape={<CustomDot />} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
