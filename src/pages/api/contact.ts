import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  if (
    !data.name ||
    !data.email ||
    !data.phone ||
    !data.subject ||
    !data.message
  ) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: import.meta.env.EMAIL_USER,
    to: import.meta.env.EMAIL_USER,
    subject: 'New Contact Message',
    html: `
      <h1>New Contact Message</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'There was an issue with sending the email',
        error: (error as any).message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
