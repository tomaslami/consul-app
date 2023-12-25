// contact.ts
import { transporter, mailOptions } from '../../lib/nodemailer';

interface ContactFormData {
  name: FormDataEntryValue;
  email: FormDataEntryValue;
  subject: FormDataEntryValue;
  message: FormDataEntryValue;
}
export default async function sendMail({ name, email, subject, message }: ContactFormData) {
  try {
    if (!name || !email || !subject || !message) {
      throw new Error('Missing fields');
    }

    const result = await transporter.sendMail(mailOptions(email.toString(), name.toString(), subject.toString(), message.toString()));
    console.log(result);

    return { message: 'Message sent' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
}
