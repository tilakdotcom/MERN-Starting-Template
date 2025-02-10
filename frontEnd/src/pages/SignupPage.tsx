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
import { successToast } from "@/lib/toast";
import { signupSchma } from "@/schemas/signupSchema";
import { useMutation } from "@tanstack/react-query";
import { signupRequest } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [hide, setHide] = useState(false);
  const {
    mutate: SignUp,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      successToast("Signup successful!");
      navigate("/login", { replace: true });
    },
  });

  if (isError) {
    // errorToast(error?.message || "Signup Failed!");
    console.log(error);
  }

  const form = useForm<z.infer<typeof signupSchma>>({
    resolver: zodResolver(signupSchma),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchma>) {
    SignUp(values);
  }

  return (
    <div className="lg:px-20 flex justify-center items-center px-10 py-5 my-auto h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full max-w-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-white p-8 rounded-lg shadow-lg space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Sign Up
            </h2>
            <p className="text-center text-gray-600">Create your account</p>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-username"
                      className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-email"
                      className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your email"
                      {...field}
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
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-linear ${
                  isPending ? " cursor-not-allowed bg-blue-300" : ""
                }`}
              >
                {isPending ? "Please Wait..." : "Sign Up"}
              </Button>
            </div>
            <p className="text-gray-500 text-sm text-center mt-6">
              have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login with
              </Link>
              .
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
