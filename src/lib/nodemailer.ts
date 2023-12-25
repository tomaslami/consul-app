import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const mailOptions = (fromEmail: string, name: string, subject: string, message: string) => {
  return {
    to: process.env.EMAIL_USER,
    from: `${fromEmail}`,
    subject: `${subject}`,
    text: message,
    html: `
    <p style=
    "font-size: 14px; 
    font-weight: 500; 
    color: #000;
    ">Mensaje: ${message}</p>
    `,
    replyTo: fromEmail
  }
}