import queryClient from "@/config/queryClient";
import {
  deleteSessionRequest,
  logoutRequest,
  verifyEmailSend,
} from "@/lib/api";
import { errorToast, successToast } from "@/lib/toast";
import { TSession } from "@/types/session";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessions from "@/hooks/useSesstions";
import { useAuth } from "@/hooks/useAuth";

export default function UserDashboard() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
      successToast("Logged out successfully");
      
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex">
      <aside className="w-1/4 bg-gray-800 p-6 shadow-2xl">
        <h2 className="text-3xl font-bold text-white border-b-2 border-blue-500 pb-2">
          Dashboard
        </h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActive("home")}
                className={`text-lg block p-3 rounded-lg font-semibold transition-all ${
                  active === "home"
                    ? "bg-blue-600 text-white shadow-xl"
                    : "text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Home
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActive("session")}
                className={`text-lg block p-3 rounded-lg font-semibold transition-all ${
                  active === "session"
                    ? "bg-blue-600 text-white shadow-xl"
                    : "text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Sessions
              </button>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="text-lg block p-3 mt-4 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-10">
        {active === "home" && <UserSection />}
        {active === "session" && <SessionsList />}
      </main>
    </div>
  );
}

const UserSection = () => {
  const { user } = useAuth();
  const { mutate: verifyEmailRequest } = useMutation({
    mutationFn: verifyEmailSend,
    onSettled: () => {
      queryClient.clear();
      successToast("Check your email inbox.");
    },
  });
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center py-6">
        Welcome, {user?.data.user || "Guest"}
      </h1>
      <div className="py-5 text-center">
        {user?.data.verifiedEmail ? (
          <div className="bg-green-600 rounded-xl p-4 text-white shadow-lg">
            Your email is verified. Enjoy full access to your profile.
          </div>
        ) : (
          <div className="bg-red-600 rounded-xl p-4 shadow-md">
            <p>Your email is not verified. Please verify your email.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-5 rounded-xl mt-4 transition"
              onClick={() => verifyEmailRequest()}
            >
              Verify Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SessionsList = () => {
  const { sessions = [] } = useSessions();
  const { mutate: deleteSession, isPending } = useMutation({
    mutationFn: deleteSessionRequest,
    onSuccess: () => {
      successToast("Session deleted successfully");
    },
    onError: () => {
      errorToast("Failed to delete session");
    },
    onSettled: () => {
      queryClient.refetchQueries();
    },
  });

  console.log("sessions", sessions);

  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Active Sessions</h2>
      {sessions.length > 0 ? (
        <ul className="divide-y divide-gray-600">
          {sessions.map((session: TSession, index: number) => {
            const current = !!session.isCurrect;
            return (
              <li
                key={index}
                className={`py-4 flex justify-between items-center ${
                  current ? "bg-blue-600" : ""
                } p-4 rounded-lg`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    {session.userAgent}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(session.createdAt).toLocaleString("en-US")}
                  </p>
                </div>
                {!current && (
                  <button
                    disabled={isPending}
                    className="text-red-500 font-bold hover:text-red-700 transition"
                    onClick={() => deleteSession(session._id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-400">No active sessions available.</p>
      )}
    </div>
  );
};
