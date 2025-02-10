import API from "@/config/axiousInstance";
import {
  LoginData,
  ResetPasswordData,
  SignupData,
} from "@/types/apiRequestTypes";
import { TSession } from "@/types/session";
import { Data } from "@/types/user";

export const loginRequest = async (data: LoginData) => {
  return API.post("/auth/login", data);
};

export const signupRequest = async (data: SignupData) => {
  return API.post("/auth/register", data);
};

export const verifyEmailSend = async () =>{
  return API.get("/user/verify-email-request");
}

export const verifyEmailRequest = async (code: string) => {
  return API.patch(`/user/verify-email/${code}`);
};

export const forgotPasswordRequest = async (email: string) => {
  return API.post("/user/forgot-password", { email });
};

export const resetPasswordRequest = async (data: ResetPasswordData) => {
  return await API.patch("/user/reset-password", data);
};

export const logoutRequest = async () => {
  return await API.get("/auth/logout");
};

export const userRequest = ():Promise<Data> => {
  return API.get("/user");
};

export const sessionRequest = async (): Promise<TSession[]> => {
  return await API.get("/session");
};

export const deleteSessionRequest = async (id: string) => {
  return await API.delete(`/session/${id}`);
};

export const refreshTokenRequest = async() => {
  return await API.get("/auth/refresh");
}