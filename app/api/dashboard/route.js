import { NextResponse } from "next/server"
import { getDashboardData } from "@/lib/mock-data"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get("timeRange") || "7 Days"

  try {
    const data = getDashboardData(timeRange)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
