import { useState, useEffect } from 'react';
import BookingForm from './booking-form';
import { ui } from '../i18n/ui';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';

interface BookingCalendarProps {
	lang: string;
}

interface Reserva {
	title: string;
	start: string;
	end: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ lang }) => {
	const [reservas, setReservas] = useState<Reserva[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
	const [date, setDate] = useState<Date | null>(null);

	useEffect(() => {
		if (selectedAccommodation) {
			cargarReservas();
		} else {
			setReservas([]);
		}
	}, [selectedAccommodation]);

	async function cargarReservas() {
		try {
			const response = await fetch(`/api/reservation?loft=${selectedAccommodation}`);
			if (!response.ok) {
				throw new Error('Error al cargar las reservas');
			}
			const data = await response.json();
			setReservas(data);
			setError(null);
		} catch (error) {
			console.error('Error al cargar las reservas:', error);
			setError('Error al cargar las reservas. Por favor, inténtelo de nuevo más tarde.');
		}
	}

	const handleAccommodationChange = (value: string) => {
		setSelectedAccommodation(value);
	};

	const handleDateChange = (
		value: Date | Date[] | null,
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		if (value instanceof Date) {
			setDate(value);
			const clickedDate = value.toISOString().split('T')[0];
			console.log('Fecha clickeada:', clickedDate);
		}
	};

	const tileClassName = ({ date, view }: { date: Date; view: string }) => {
		if (view !== 'month') return '';

		const dateStr = date.toISOString().split('T')[0];
		for (const reserva of reservas) {
			if (dateStr >= reserva.start && dateStr < reserva.end) {
				return 'occupied-date';
			}
		}
		return '';
	};

	return (
		<section className="px-8 xl:px-0 w-full mt-[40px] lg:mt-[40px]">
			<div className="w-full lg:max-w-[1200px] p-12 mx-auto lg:px-[116px] lg:py-[40px] bg-primary-300 rounded-[70px]">
				<h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[40px] w-full capitalize lg:max-w-[75%] pb-2 mx-auto">
					{ui[lang].booking.calendarTitle}
				</h2>
				<p className="text-base md:text-[20px] text-center tracking-tight font-jost text-text-gray leading-[33px] lg:max-w-[60%] mx-auto">
					{ui[lang].booking.selectDates}
				</p>
				{error && <p className="text-red-500 text-center mt-4">{error}</p>}

				<BookingForm lang={lang} onAccommodationChange={handleAccommodationChange} />

				{selectedAccommodation && (
					<div className="mt-8">
						<Calendar
							onChange={handleDateChange}
							value={date}
							tileClassName={tileClassName}
							className="react-calendar"
						/>
					</div>
				)}

				{reservas.length === 0 && (
					<p className="text-center mt-4">
						{selectedAccommodation
							? 'No hay reservas disponibles.'
							: 'Por favor, selecciona un alojamiento.'}
					</p>
				)}

				<small className="text-text-gray text-xs mt-4 block">
					{ui[lang].booking.confirmationNote}
				</small>
			</div>

			<style>{`
				.react-calendar .occupied-date {
					background-color: red;
					color: white;
				}
				.react-calendar .occupied-date:hover {
					background-color: darkred;
				}
				.react-calendar .occupied-date abbr {
					color: white;
				}
			`}</style>
		</section>
	);
};

export default BookingCalendar;
