"use client"

import { ClientsBubbleChart } from "@/components/charts/clients-bubble-chart"
import { SipBusinessChart } from "@/components/charts/sip-business-chart"
import { MonthlyMisChart } from "@/components/charts/monthly-mis-chart"

export function ChartsSection({ timeRange }) {
  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clients Bubble Chart */}
        <ClientsBubbleChart timeRange={timeRange} />

        {/* SIP Business Chart */}
        <SipBusinessChart timeRange={timeRange} />
      </div>

      {/* Monthly MIS Chart - Full Width */}
      <MonthlyMisChart timeRange={timeRange} />
    </div>
  )
}
