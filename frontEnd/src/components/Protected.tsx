import { useAuth } from "@/hooks/useAuth";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";

export default function Protected() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    );
  }

  return <Layout />;
}

export const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16"></div>
    </div>
  );
};
