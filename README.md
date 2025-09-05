=======
# Financial Dashboard

A comprehensive financial dashboard built with Next.js, featuring real-time data visualization, mobile optimization, and PDF report generation capabilities.

## Features

- **Real-time Dashboard**: Interactive charts and statistics for financial data
- **Mobile Optimized**: Built with Capacitor for native mobile app support
- **Data Visualization**: Multiple chart types including bubble charts, monthly MIS charts, and SIP business charts
- **API Integration**: RESTful API endpoints for clients, dashboard data, MIS reports, and SIP business
- **PDF Generation**: Automated PDF report generation functionality
- **Responsive Design**: Optimized for desktop and mobile devices
- **Time Range Filtering**: Flexible date range selection for data analysis
- **Toast Notifications**: User-friendly notifications system
- **Theme Support**: Dark/light theme provider

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Mobile**: Capacitor
- **Charts**: Chart.js / Recharts
- **UI Components**: Custom component library
- **API**: Next.js API Routes

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Web Application
- Access the dashboard at `http://localhost:3000`
- Use the time range filter to select specific date ranges
- View various charts and statistics
- Generate PDF reports using the PDF generation feature

### Mobile Application
1. Build the mobile app:
```bash
npx cap add android  # or ios
npx cap sync
```

2. Run on device/emulator:
```bash
npx cap run android  # or ios
```

## API Endpoints

- `GET /api/clients` - Retrieve client data
- `GET /api/dashboard` - Get dashboard statistics
- `GET /api/dashboard-data` - Fetch dashboard data
- `GET /api/mis-report` - Generate MIS reports
- `GET /api/sip-business` - Get SIP business data
- `POST /api/generate-pdf` - Generate PDF reports

## Project Structure

```
financial-dashboard/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── pdf-view/          # PDF viewer pages
│   └── layout.jsx         # Root layout
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Screenshot

![alt text](<Screenshot 2025-09-05 114932.png>)
![Dashboard Screenshot](<Screenshot 2025-09-04 201705.png>)
