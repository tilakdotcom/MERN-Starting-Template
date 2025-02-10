import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/Dashboard";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordLinkPage from "./pages/ResetPasswordLinkPage";
import VerifyAndPasswordPage from "./pages/VerifyAndPasswordPage";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/email-verify/:code" element={<VerifyEmailPage />} />
        <Route
          path="/reset-password"
          element={<ResetPasswordLinkPage />}
        />
        <Route path="/password-reset" element={<VerifyAndPasswordPage />} />
      </Routes>
    </>
  );
}
