import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function RouteForOnlyAuthenticated() {
  const { user } = useAuth();

  if (!user?.data?.user) {
    return (
      <Navigate 
        to="/login" 
        replace 
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-16 h-16 rounded-full animate-spin border-4 border-t-4 border-t-transparent border-green-500"></div>
    </div>
  );
};
