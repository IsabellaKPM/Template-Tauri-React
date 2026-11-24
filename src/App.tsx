import "./globals.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/shared/components/Layout/MainLayout";
import { GuestRoute } from "@/shared/components/GuestRoute/GuestRoute";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";
import { UserRoles } from "@/features/auth/enums/userRoles";
import { ROUTES } from "@/shared/lib/routes";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";

function GuestLayout() {
  return (
    <GuestRoute>
      <div className="container mx-auto flex justify-center px-4 py-12 md:py-24">
        <Outlet />
      </div>
    </GuestRoute>
  );
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function AdminLayout() {
  return (
    <ProtectedRoute roles={[UserRoles.ADMIN]}>
      <Outlet />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />

        <Route element={<GuestLayout />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={ROUTES.users} element={<UsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
