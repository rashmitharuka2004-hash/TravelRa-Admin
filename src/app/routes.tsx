import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { TourPackages } from "./components/TourPackages";
import { DestinationManagement } from "./components/DestinationManagement";
import { TaxiManagement } from "./components/TaxiManagement";
import { BookingManagement } from "./components/BookingManagement";
import { UserManagement } from "./components/UserManagement";
import { PaymentMonitoring } from "./components/PaymentMonitoring";
import { FeedbackManagement } from "./components/FeedbackManagement";
import { AdminSettings } from "./components/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "destinations", Component: DestinationManagement },
      { path: "tour-packages", Component: TourPackages },
      { path: "taxi-management", Component: TaxiManagement },
      { path: "bookings", Component: BookingManagement },
      { path: "users", Component: UserManagement },
      { path: "payments", Component: PaymentMonitoring },
      { path: "feedback", Component: FeedbackManagement },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);