import { Loader } from "@/components/Protected";
import { useAuth } from "@/hooks/useAuth";
import { verifyEmailRequest } from "@/lib/api";
import { errorToast, successToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const { code } = useParams();
  const { user, isPending: loading } = useAuth();

  const {
    mutate: verifyEmail,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: verifyEmailRequest,
    onSuccess: () => {
      successToast("verified successfully ");
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    errorToast(error?.message || "Link failed to verify email");
  }
  if (!code) {
    errorToast("Invalid verification code");
    return;
  }

  const handleOnVerifyButton = async () => {
    verifyEmail(code);
    console.log("verified");
  };
  return (
    <div className=" min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {user?.data.verifiedEmail ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
              You are verified.
            </h2>
            <h3 className="text-center">
              <Link
                to={"/dashboard"}
                className=" text-green-600 cursor-pointer hover:underline"
              >
                Go to Dashboard
              </Link>
            </h3>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
              Verify Your Email
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Please verify your email to activate your account. We have sent a
              verification link to your email address. Click the button below
              once you have verified your email.
            </p>
            <button
              disabled={isPending}
              onClick={handleOnVerifyButton}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Verify Your Account
            </button>
            <p className="text-gray-500 text-sm text-center mt-6">
              Didn't receive the email?{" "}
              <span className="text-green-600 cursor-pointer hover:underline">
                Resend verification email
              </span>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
