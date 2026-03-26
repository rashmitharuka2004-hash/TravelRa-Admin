import { createBrowserRouter } from 'react-router-dom';
import TicketVerify from './pages/TicketVerify';
import Dashboard from './app/components/Dashboard';
// ... import your other components (Dashboard, Login, etc.)

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Your existing main page
  },
  {
    path: "/verify/:id", // This matches the URL in your Android QR code
    element: <TicketVerify />,
  },
  // ... other existing routes
]);