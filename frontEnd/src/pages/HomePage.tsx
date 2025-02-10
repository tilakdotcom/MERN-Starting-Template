import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheckIcon, UserPlusIcon, LockIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 mb-6">
          Advanced Authentication with JWT
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Secure your applications with modern authentication techniques
          using MERN Stack and JWT.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <ShieldCheckIcon size={40} className="text-green-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Secure Authentication</h3>
              <p className="text-gray-600 mb-4">
                Protect your app with robust JWT-based authentication.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <UserPlusIcon size={40} className="text-blue-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">
                Enable seamless user signups and role-based access control.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <LockIcon size={40} className="text-red-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Token Security</h3>
              <p className="text-gray-600 mb-4">
                Manage access tokens and refresh tokens securely.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="default" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
