import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const data = await request.json();

	// Configure the email transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: import.meta.env.EMAIL_USER,
			pass: import.meta.env.EMAIL_PASS,
		},
	});

	// Configure the email
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: 'famarahouse12@gmail.com',
		subject: 'Nueva solicitud de reserva',
		html: `
            <h1>Nueva solicitud de reserva</h1>
			<p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Fecha de inicio:</strong> ${data.startDate}</p>
            <p><strong>Fecha de fin:</strong> ${data.endDate}</p>
            <p><strong>Tipo de alojamiento:</strong> ${data.accommodationType}</p>
            <p><strong>Número de huéspedes:</strong> ${data.guestsNumber}</p>
            <p><strong>Hora de check-in:</strong> ${data.checkInTime}</p>
            <p><strong>Solicitudes especiales:</strong> ${data.specialRequests || 'Ninguna'}</p>
            <p><strong>Correo electrónico del cliente:</strong> ${data.email}</p>
        `,
	};

	try {
		// Send the email
		await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ message: 'Correo enviado correctamente' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error al enviar el correo:', error);
		return new Response(JSON.stringify({ message: 'Error al enviar el correo' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};
