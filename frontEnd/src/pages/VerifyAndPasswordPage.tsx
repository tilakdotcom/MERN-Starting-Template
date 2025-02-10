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
import { passwordSchema } from "@/schemas/passwordSchma";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordRequest } from "@/lib/api";
import { errorToast, successToast } from "@/lib/toast";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function VerifyAndPasswordPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [hide, setHide] = useState(false);

  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      navigate("/login");
      successToast("Password reset Successfully");
    },
  });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    resetPassword({
      token: params.token as string,
      password: values.password,
    });
  }
  if (isError) {
    console.error("Error during password reset", error);
    errorToast("Link expired or Invalid link");
  }
  return (
    <div className=" min-h-screen lg:px-20 flex justify-center items-center px-10 py-5 my-auto">
      <div className="flex justify-center items-center md:w-96">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-green-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
          >
            <h2 className="text-2xl font-bold text-center text-white ">
              Reset Your Password
            </h2>
            <p className="text-center text-gray-200">
              Enter your new password here
            </p>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-700 ">
                    New Password
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
            <div className="py-2 md:py-4">
              <Button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 bg-green-400 hover:bg-green-500 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ease-linear ${
                  isPending ? " cursor-not-allowed bg-green-300" : ""
                }`}
              >
                {isPending ? "Wait" : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
