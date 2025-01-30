import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { MAILTRAP_TOKEN, USER_EMAIL } from "../constants/getEnv";

export const mailTransport = Nodemailer.createTransport(
  MailtrapTransport({
    token: MAILTRAP_TOKEN,
  })
);

export const mailSender = {
  address: USER_EMAIL,
  name: "MERN Authentication",
};