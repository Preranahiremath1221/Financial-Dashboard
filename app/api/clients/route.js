import { NextResponse } from "next/server"

// Mock data for clients
function generateClientsData() {
  const clients = []
  const names = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson", "Diana Davis", "Eve Miller", "Frank Garcia", "Grace Lee", "Henry Taylor"]

  for (let i = 0; i < 10; i++) {
    clients.push({
      name: names[i] || `Client ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20, // 20-70 years
      investment: Math.floor(Math.random() * 500000) + 100000, // 100k-600k
      aum: Math.floor(Math.random() * 1000000) + 500000, // 500k-1.5M
    })
  }

  return clients
}

export async function GET() {
  const data = generateClientsData()
  return NextResponse.json(data)
}
