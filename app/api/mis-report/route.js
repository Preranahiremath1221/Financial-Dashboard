import { NextResponse } from "next/server"

// Mock data for Monthly MIS Report
function generateMisReportData() {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 0; i < 12; i++) {
    data.push({
      month: months[i],
      purchases: Math.floor(Math.random() * 100000) + 50000,
      redemptions: Math.floor(Math.random() * 80000) + 20000,
      newSip: Math.floor(Math.random() * 500) + 100,
    })
  }

  return data
}

export async function GET() {
  const data = generateMisReportData()
  return NextResponse.json(data)
}
