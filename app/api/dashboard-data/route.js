import { NextResponse } from "next/server"

// Mock data generator for different time ranges
function generateMockData(days) {
  const sipBusinessData = []
  const monthlyMisData = []
  const clientsData = []
  const statsData = {
    purchases: Math.floor(Math.random() * 2000) + 1000,
    redemptions: Math.floor(Math.random() * 800) + 400,
    rejectedTransactions: Math.floor(Math.random() * 50) + 10,
    sipRejections: Math.floor(Math.random() * 20) + 5,
    newSip: Math.floor(Math.random() * 300) + 100,
  }

  // Generate SIP Business data
  for (let i = 0; i < Math.min(days, 12); i++) {
    const month = new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" })
    sipBusinessData.push({
      month,
      sip: Math.floor(Math.random() * 30000) + 40000,
      business: Math.floor(Math.random() * 50000) + 100000,
    })
  }

  // Generate Monthly MIS data
  for (let i = 0; i < Math.min(days, 12); i++) {
    const month = new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" })
    monthlyMisData.push({
      month,
      equity: Math.floor(Math.random() * 30000) + 80000,
      debt: Math.floor(Math.random() * 20000) + 40000,
      hybrid: Math.floor(Math.random() * 15000) + 30000,
    })
  }

  // Generate Clients data
  const clientTypes = ["High Net Worth", "Corporate", "Retail", "Institutional", "NRI"]
  clientTypes.forEach((name, index) => {
    clientsData.push({
      x: Math.floor(Math.random() * 200) + 50,
      y: Math.floor(Math.random() * 300) + 100,
      z: Math.floor(Math.random() * 100) + 30,
      name,
    })
  })

  return {
    sipBusinessData,
    monthlyMisData,
    clientsData,
    statsData,
    aum: {
      value: 24567890,
      change: (Math.random() * 20 - 10).toFixed(1), // -10% to +10%
    },
    sip: {
      value: 4523100,
      change: (Math.random() * 20 - 10).toFixed(1),
    },
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get("timeRange") || "7 Days"

  const days = Number.parseInt(timeRange.split(" ")[0])
  const data = generateMockData(days)

  return NextResponse.json(data)
}
