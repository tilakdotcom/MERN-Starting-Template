import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { LoginSchma } from "@/schemas/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "@/lib/toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  const { mutate: Login, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
      successToast("Login Successful");
    },
    onError: () => {
      errorToast("Invalid credentials");
    },
  });

  const form = useForm<z.infer<typeof LoginSchma>>({
    resolver: zodResolver(LoginSchma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchma>) {
    Login(values);
  }

  return (
    <div className="min-h-screen lg:px-20 flex justify-center items-center px-10 py-5 my-auto bg-gray-50">
      <div className="flex justify-center items-center md:w-1/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-white p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Login
            </h2>
            <p className="text-center text-gray-600">Login to your account</p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none md:text-base"
                      placeholder="Enter your email"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-700 ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className=" flex items-center">
                      <Input
                        type={hide ? "text" : "password"}
                        className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none md:text-base
                        select-none"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                      {!hide ? (
                        <EyeOff
                          className="-ml-8 cursor-pointer"
                          onClick={() => setHide(!hide)}
                        />
                      ) : (
                        <Eye
                          className="-ml-8 cursor-pointer"
                          onClick={() => setHide(!hide)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end px-1 hover:underline cursor-pointer text-xs font-bold text-blue-600 select-none">
              <Link to={"/reset-password"}>Reset password</Link>
            </div>
            <div className="py-2 md:py-4">
              <Button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-linear ${
                  isPending ? " cursor-not-allowed bg-blue-300" : ""
                }`}
              >
                {isPending ? "Wait" : "Login"}
              </Button>
            </div>
            <p className="text-gray-500 text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Create a new one
              </Link>
              .
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
