import { NextResponse } from "next/server"

// Mock data for SIP business
function generateSipBusinessData() {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let previousAmount = 100000

  for (let i = 0; i < 12; i++) {
    const purchaseAmount = Math.floor(Math.random() * 50000) + previousAmount
    const growth = ((purchaseAmount - previousAmount) / previousAmount) * 100
    data.push({
      month: months[i],
      purchaseAmount,
      growth: parseFloat(growth.toFixed(2)),
    })
    previousAmount = purchaseAmount
  }

  return data
}

export async function GET() {
  const data = generateSipBusinessData()
  return NextResponse.json(data)
}
