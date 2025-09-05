"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const timeRanges = ["3 Days", "7 Days", "10 Days", "30 Days"]

export function TimeRangeFilter({ timeRange, onTimeRangeChange }) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-4 flex items-center">Time Range:</span>
        {timeRanges.map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeRangeChange(range)}
          >
            {range}
          </Button>
        ))}
      </div>
    </Card>
  )
}
