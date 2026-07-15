import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { RestaurantProvider } from "./context/RestaurantContext";
import { ReservationProvider } from "./context/ReservationContext";
import { NotificationProvider } from "./context/NotificationContext";

import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { customerNavItems, ownerNavItems, adminNavItems } from "./routes/dashboardNav";

import { Home } from "./pages/public/Home";
import { Restaurants } from "./pages/public/Restaurants";
import { RestaurantDetails } from "./pages/public/RestaurantDetails";
import { SearchResults } from "./pages/public/SearchResults";
import { About } from "./pages/public/About";
import { Contact } from "./pages/public/Contact";
import { NotFound } from "./pages/public/NotFound";

import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

import { CustomerHome } from "./pages/customer/CustomerHome";
import { CustomerProfile } from "./pages/customer/CustomerProfile";
import { CustomerReservations } from "./pages/customer/CustomerReservations";
import { CustomerFavorites } from "./pages/customer/CustomerFavorites";
import { CustomerNotifications } from "./pages/customer/CustomerNotifications";
import { CustomerReviews } from "./pages/customer/CustomerReviews";
import { CustomerSettings } from "./pages/customer/CustomerSettings";

import { OwnerOverview } from "./pages/owner/OwnerOverview";
import { OwnerRestaurantProfile } from "./pages/owner/OwnerRestaurantProfile";
import { OwnerMenuManagement } from "./pages/owner/OwnerMenuManagement";
import { OwnerReservations } from "./pages/owner/OwnerReservations";
import { OwnerReviews } from "./pages/owner/OwnerReviews";
import { OwnerRevenue } from "./pages/owner/OwnerRevenue";
import { OwnerSettings } from "./pages/owner/OwnerSettings";

import { AdminOverview } from "./pages/admin/AdminOverview";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminRestaurants } from "./pages/admin/AdminRestaurants";
import { AdminReservations } from "./pages/admin/AdminReservations";
import { AdminReviews } from "./pages/admin/AdminReviews";
import { AdminPayments } from "./pages/admin/AdminPayments";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { AdminSettings } from "./pages/admin/AdminSettings";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RestaurantProvider>
            <ReservationProvider>
              <NotificationProvider>
                <Toaster position="top-center" toastOptions={{ style: { fontSize: "14px" } }} />
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/restaurants/:slug" element={<RestaurantDetails />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["customer"]}>
                        <DashboardLayout navItems={customerNavItems} roleLabel="Customer" />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<CustomerHome />} />
                    <Route path="profile" element={<CustomerProfile />} />
                    <Route path="reservations" element={<CustomerReservations />} />
                    <Route path="favorites" element={<CustomerFavorites />} />
                    <Route path="notifications" element={<CustomerNotifications />} />
                    <Route path="reviews" element={<CustomerReviews />} />
                    <Route path="settings" element={<CustomerSettings />} />
                  </Route>

                  <Route
                    path="/owner"
                    element={
                      <ProtectedRoute allowedRoles={["owner"]}>
                        <DashboardLayout navItems={ownerNavItems} roleLabel="Restaurant Owner" />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<OwnerOverview />} />
                    <Route path="profile" element={<OwnerRestaurantProfile />} />
                    <Route path="menu" element={<OwnerMenuManagement />} />
                    <Route path="reservations" element={<OwnerReservations />} />
                    <Route path="reviews" element={<OwnerReviews />} />
                    <Route path="revenue" element={<OwnerRevenue />} />
                    <Route path="settings" element={<OwnerSettings />} />
                  </Route>

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardLayout navItems={adminNavItems} roleLabel="Administrator" />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminOverview />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="restaurants" element={<AdminRestaurants />} />
                    <Route path="reservations" element={<AdminReservations />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </NotificationProvider>
            </ReservationProvider>
          </RestaurantProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
