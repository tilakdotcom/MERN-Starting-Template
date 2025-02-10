import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export function RouteForOnlyAuthenticated() {
  const { user } = useAuth();
  const location = useLocation();


  if (!user?.data?.user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ redirectUrl: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export const RouteForOnlyNotAuthenticated = () => {
  const { user } = useAuth();
  if (user?.data?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-16 h-16 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};
