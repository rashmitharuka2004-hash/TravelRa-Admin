import { createBrowserRouter } from 'react-router-dom';
import TicketVerify from './pages/TicketVerify';
// Ensure this path matches your explorer: src/app/components/Dashboard.tsx
import Dashboard from './app/components/Dashboard';

export const router = createBrowserRouter([
  {
    // Added leading slash for the root path
    path: "/",
    element: <Dashboard />,
  },
  {
    /** * FIXED: Added leading slash. 
     * The ':id' catches the booking ID.
     * The '*' handles any trailing slashes from the mobile browser.
     */
    path: "/verify/:id/*", 
    element: <TicketVerify />,
  },
]);