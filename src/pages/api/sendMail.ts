import type { APIRoute } from "astro";
import sendMail from '../../pages/api/contact'; // Ajusta la ruta según tu estructura de archivos

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    // Validate the data - you'll probably want to do more than this
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    // Send the email
    await sendMail({ name, email, subject, message });

    // Return a success response
    return new Response(
      JSON.stringify({
        message: "Success!"
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
};