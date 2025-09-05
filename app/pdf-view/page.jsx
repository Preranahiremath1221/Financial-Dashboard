"use client"

import { AumSipCards } from "@/components/aum-sip-cards"
import { StatCards } from "@/components/stat-cards"
import { ChartsSection } from "@/components/charts-section"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function PDFContent() {
  const searchParams = useSearchParams()
  const timeRange = searchParams.get("timeRange") || "7 Days"

  return (
    <div className="min-h-screen bg-white p-8 print:p-4">
      {/* PDF Header */}
      <div className="mb-8 text-center border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard Report</h1>
        <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        <p className="text-gray-600">Time Range: {timeRange}</p>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-8">
        {/* AUM/SIP Cards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <AumSipCards timeRange={timeRange} />
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Statistics</h2>
          <StatCards timeRange={timeRange} />
        </section>

        {/* Charts */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
          <ChartsSection timeRange={timeRange} />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>This report was generated automatically from the Financial Dashboard system.</p>
          <p>© 2024 Financial Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default function PDFViewPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading PDF content...</div>}>
      <PDFContent />
    </Suspense>
  )
}
