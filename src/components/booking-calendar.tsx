import { useState, useEffect } from 'react';
import BookingForm from './booking-form';
import { ui } from '../i18n/ui';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';
import type { CalendarProps } from 'react-calendar';
import type { BookingCalendarProps, Reserva } from '../utils/types';

const BookingCalendar: React.FC<BookingCalendarProps> = ({ lang }) => {
	const [reservas, setReservas] = useState<Reserva[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
	const [tempStartDate, setTempStartDate] = useState<Date | null>(null);

	useEffect(() => {
		if (selectedAccommodation) {
			cargarReservas();
		} else {
			setReservas([]);
			setDateRange([null, null]);
		}
	}, [selectedAccommodation]);

	async function cargarReservas() {
		try {
			const response = await fetch(`/api/reservation?loft=${selectedAccommodation}`);
			if (!response.ok) {
				throw new Error(ui[lang].errors.errorFetchingReservations);
			}
			const data = await response.json();
			setReservas(data);
			setError(null);
		} catch (error) {
			setError(ui[lang].errors.errorFetchingReservations);
		}
	}

	const handleAccommodationChange = (value: string) => {
		setSelectedAccommodation(value);
	};

	const isDateOccupied = (date: Date): boolean => {
		return reservas.some((reserva) => {
			const start = new Date(reserva.start);
			const end = new Date(reserva.end);
			return date >= start && date < end;
		});
	};

	const handleDateChange: CalendarProps['onChange'] = (value) => {
		if (Array.isArray(value) || !(value instanceof Date)) {
			return;
		}

		const [start, end] = dateRange;

		if (!start) {
			setTempStartDate(value);
			setDateRange([value, null]);
		} else if (!end) {
			if (value.getTime() === start.getTime()) {
				setDateRange([null, null]);
				setTempStartDate(null);
			} else if (value <= start) {
				setTempStartDate(value);
				setDateRange([value, null]);
			} else {
				const diffTime = Math.abs(value.getTime() - start.getTime());
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

				if (diffDays < 4) {
					const newEndDate = new Date(start);
					newEndDate.setDate(newEndDate.getDate() + 4);
					if (!hasBlockedDatesInRange(start, newEndDate)) {
						setDateRange([start, newEndDate]);
						setTempStartDate(null);
					}
				} else {
					if (!hasBlockedDatesInRange(start, value)) {
						setDateRange([start, value]);
						setTempStartDate(null);
					}
				}
			}
		} else {
			if (value.getTime() === end.getTime()) {
				setDateRange([null, null]);
				setTempStartDate(null);
			} else {
				setTempStartDate(value);
				setDateRange([start, value]);
			}
		}
	};

	const hasBlockedDatesInRange = (start: Date, end: Date): boolean => {
		const currentDate = new Date(start);
		while (currentDate < end) {
			if (isDateOccupied(currentDate)) {
				return true;
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return false;
	};

	const tileClassName = ({ date, view }: { date: Date; view: string }) => {
		if (view !== 'month') return '';

		const [start, end] = dateRange;

		if (isDateOccupied(date)) {
			return 'occupied-date';
		}

		if (start && end && date >= start && date <= end) {
			return 'selected-date';
		}

		if (tempStartDate && date.getTime() === tempStartDate.getTime()) {
			return 'temp-selected-date';
		}

		return '';
	};

	const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
		if (view !== 'month') return false;

		const [start] = dateRange;
		if (start) {
			if (date.getTime() === start.getTime()) {
				return false;
			}
			if (date < start) {
				return true;
			}

			const minEndDate = new Date(start);
			minEndDate.setDate(minEndDate.getDate() + 3);
			if (date > start && date <= minEndDate) {
				return true;
			}
		}

		return isDateOccupied(date);
	};

	return (
		<section className="px-8 xl:px-0 w-full mt-[40px] lg:mt-[40px]">
			<div className="w-full lg:max-w-[1200px] p-12 mx-auto lg:px-[116px] lg:py-[40px] bg-primary-300 rounded-[70px]">
				<h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[40px] w-full capitalize lg:max-w-[75%] pb-2 mx-auto">
					{ui[lang].booking.calendarTitle}
				</h2>
				{error && <p className="text-red-500 text-center mt-4">{error}</p>}

				{selectedAccommodation && (
					<div className="flex justify-center mt-8 mb-8">
						<Calendar
							onChange={handleDateChange}
							value={dateRange}
							tileClassName={tileClassName}
							tileDisabled={tileDisabled}
							selectRange={false}
							className="react-calendar"
						/>
					</div>
				)}

				{reservas.length === 0 && (
					<p className="text-center mt-4">
						{selectedAccommodation
							? ui[lang].booking.noBookingsAvailable
							: ui[lang].booking.selectAccommodation}
					</p>
				)}

				<BookingForm
					lang={lang}
					onAccommodationChange={handleAccommodationChange}
					checkInDate={dateRange[0]}
					checkOutDate={dateRange[1]}
				/>

				<small className="text-text-gray text-xs mt-4 block">
					{ui[lang].booking.confirmationNote}
				</small>
			</div>

			<style>{`
                .react-calendar .occupied-date {
                    position: relative;
                    color: #999;
                    text-decoration: line-through;
                }

                .react-calendar .occupied-date:hover {
                    background-color: #f0f0f0;
                    cursor: not-allowed;
                }

                .react-calendar .selected-date {
                    background-color: #007bff;
                    color: white;
                }

                .react-calendar .temp-selected-date {
                    background-color: #b3d7ff;
                    color: black;
                }
            `}</style>
		</section>
	);
};

export default BookingCalendar;
