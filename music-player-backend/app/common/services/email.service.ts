import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.hepler";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Sends an email using the configured transport.
 * @param mailOptions - A Mail.Options object to be passed to the transporter.
 * @returns A Promise that resolves to the result of the email send operation.
 * @throws A 500 error is thrown if an error occurs during the email send operation.
 */
export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};

/**
 * Generates an HTML template for a password reset email.
 * @param {string} [token=""] - The password reset token.
 * @returns {string} The HTML template as a string.
 */
export const resetPasswordEmailTemplate = (token = ""): string => `
<html>
  <body>
    <h3>Welcome to app</h3>
    <p>Click <a href="${process.env.FE_BASE_URL}/reset-password?token=${token}">here</a> to reset your password</p>
  </body>
</html>`;
