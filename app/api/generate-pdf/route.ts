import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(request: Request) {
  try {
    const { timeRange } = await request.json()

    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 })

    // Navigate to the dashboard with PDF-specific styling
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    await page.goto(`${baseUrl}/pdf-view?timeRange=${encodeURIComponent(timeRange)}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    })

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    })

    await browser.close()

    // Return PDF as response
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="financial-dashboard-${timeRange.replace(" ", "-").toLowerCase()}.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
