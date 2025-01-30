import ApiError from "../common/API/ApiError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { mailSender, mailTransport } from "./mail.config";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_MESSAGE_TEMPLATE,
} from "./MailTemplate";

export const sendVerificationEmail = (
  email: string,
  url: string
) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Verify Your Account!",
        html: VERIFICATION_EMAIL_TEMPLATE
          .replace("{username}", email)
          .replace("{verification_link}", url)
          .replace("{year}", "2025"),
        category: "Email Verification",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error sending verification email to ${email}: ${error.message}`
    );
    throw new ApiError(INTERNAL_SERVER_ERROR, `Error in sending verification`);
  }
};

export const sendWelcomeEmail = (name: string, email: string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Welcome To MERN!",
        html: WELCOME_MESSAGE_TEMPLATE.replace("{userName}", name),
        category: "Welcome",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(`Error in Welcome email to ${email}: ${error.message}`);
    throw new ApiError(INTERNAL_SERVER_ERROR, `Error in Welcome email`);
  }
};

export const sendForgotPasswordEmail = (email: string,url:string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Reset Password Link",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
        category: "Forgot Password",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error in Reset Password email to ${email}: ${error.message}`
    );
    throw new ApiError(500, `Error in Reset Password email`);
  }
};

