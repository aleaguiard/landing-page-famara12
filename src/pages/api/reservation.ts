import type { APIRoute } from 'astro';
import { format, addDays } from 'date-fns';
import ical from 'ical';
import fetch from 'node-fetch';

export const GET: APIRoute = async ({ params, request }) => {
	try {
		const { searchParams } = new URL(request.url);
		const loft = searchParams.get('loft');

		let icsUrl = '';
		if (loft === 'Loft 12') {
			icsUrl = import.meta.env.CALENDAR_LOFT || '';
		} else if (loft === 'House 12') {
			icsUrl = import.meta.env.CALENDAR_HOUSE || '';
		} else {
			return new Response(JSON.stringify({ error: 'Tipo de Alojamiento no reconocido' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const response = await fetch(icsUrl);
		const icsData = await response.text();
		const parsedData = ical.parseICS(icsData);

		const reservas: {
			title: string;
			start: string;
			end: string;
			display: string;
			color: string;
		}[] = [];

		// Parse the events from the parsedData object
		for (let k in parsedData) {
			const event = parsedData[k];
			if (event.type === 'VEVENT') {
				const start = event.start;
				const end = event.end;

				if (start && end) {
					reservas.push({
						title: 'No disponible',
						start: format(new Date(start), 'yyyy-MM-dd'),
						end: format(addDays(new Date(end), 1), 'yyyy-MM-dd'),
						display: 'background',
						color: 'red',
					});
				}
			}
		}

		return new Response(JSON.stringify(reservas), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error al leer el archivo .ics:', error);
		return new Response(JSON.stringify({ error: 'Error al cargar las reservas' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};
