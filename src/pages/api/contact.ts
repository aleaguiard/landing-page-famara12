import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const data = await request.json();

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: import.meta.env.EMAIL_USER,
			pass: import.meta.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: 'famarahouse12@gmail.com',
		subject: data.subject || 'New Contact Message',
		html: `
            <h1>New Contact Message</h1>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ message: 'Error sending email' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};
