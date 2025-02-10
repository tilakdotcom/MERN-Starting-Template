import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/Dashboard";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordLinkPage from "./pages/ResetPasswordLinkPage";
import VerifyAndPasswordPage from "./pages/VerifyAndPasswordPage";
import { Route, Routes } from "react-router-dom";
import {
  RouteForOnlyAuthenticated,
  RouteForOnlyNotAuthenticated,
} from "./components/Protected";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RouteForOnlyAuthenticated />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<RouteForOnlyNotAuthenticated />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/reset-password/:token"
            element={<VerifyAndPasswordPage />}
          />
          <Route path="/reset-password" element={<ResetPasswordLinkPage />} />
        </Route>
        <Route path="/email-verify/:code" element={<VerifyEmailPage />} />
      </Routes>
    </>
  );
}
