import queryClient from "@/config/queryClient";
import { deleteSessionRequest, logoutRequest } from "@/lib/api";
import { errorToast, successToast } from "@/lib/toast";
import { TSession } from "@/types/session";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessions from "@/hooks/useSesstions";
import {  useAuth } from "@/hooks/useAuth";

export default function UserDashboard() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.clear();
      successToast("Logged out successfully");
      navigate("/login"); // Redirect to login page after logout
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-green-800 p-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActive("home")}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Home
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActive("session")}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Sessions
              </button>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-8">
        {active === "home" && <UserSection />}
        {active === "session" && <SessionsList />}
      </main>
    </div>
  );
}

const UserSection = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 text-center py-4">
        Welcome, User
      </h1>
      <p
        className="py-5 text-center
      "
      >
        {user?.user.emailVerified ? (
          <span className="bg-green-500 rounded-xl p-2 text-white ">
            Your email is verified. You can manage your profile, change
            settings, and more.
          </span>
        ) : (
          <span className="bg-red-500 rounded-xl p-2">
            Your email is not verified. Please check your email for the
            verification link or contact support if you have questions.
          </span>
        )}
      </p>
    </>
  );
};

const SessionsList = () => {
  const { sessions } = useSessions();

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

  console.log(sessions);

  const handleOnDeleteSession = (id: string) => {
    deleteSession(id);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Sessions</h2>
      {sessions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {sessions.map((session: TSession, index: number) => {
            const current = !!session.isCurrect;
            return (
              <li
                key={index}
                className={`py-4 flex justify-between items-center ${
                  current ? " bg-emerald-300" : ""
                } p-3 rounded-xl`}
              >
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    {session.userAgent}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.createdAt).toLocaleString("en-US")}
                  </p>
                </div>
               { current ? "" : <div className="flex space-x-4">
                  
                  <button
                    disabled={isPending || current}
                    className="text-red-600 font-extrabold cursor-pointer hover:text-red-800 transition"
                    onClick={() => handleOnDeleteSession(session._id)}
                  >
                    &#10005;
                  </button>
                </div>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No sessions available.</p>
      )}
    </div>
  );
};
