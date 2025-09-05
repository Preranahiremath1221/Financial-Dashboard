// Mock API data for the financial dashboard

export const getDashboardData = (timeRange = "7 Days") => {
  const multiplier = getTimeRangeMultiplier(timeRange)

  return {
    aum: {
      value: Math.round(24567890 * multiplier),
      change: multiplier > 0.8 ? "+12.5%" : multiplier > 0.6 ? "+8.3%" : "+5.1%",
      isPositive: true,
    },
    sip: {
      value: Math.round(4567890 * multiplier),
      change: multiplier > 0.8 ? "-2.3%" : multiplier > 0.6 ? "-1.8%" : "-0.9%",
      isPositive: false,
    },
    stats: {
      purchases: Math.round(1234 * multiplier),
      redemptions: Math.round(567 * multiplier),
      rejectedTransactions: Math.round(23 * multiplier),
      sipRejections: Math.round(12 * multiplier),
      newSip: Math.round(89 * multiplier),
    },
  }
}

const getTimeRangeMultiplier = (timeRange) => {
  switch (timeRange) {
    case "30 Days":
      return 1
    case "10 Days":
      return 0.8
    case "7 Days":
      return 0.6
    case "3 Days":
      return 0.4
    default:
      return 0.6
  }
}

// API endpoints simulation
export const fetchDashboardData = async (timeRange) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getDashboardData(timeRange)
}
