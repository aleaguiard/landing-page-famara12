import { useState } from 'react';

export const useBookingForm = (onAccommodationChange: (value: string) => void) => {
	const [maxGuests, setMaxGuests] = useState<number | null>(null);
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [accommodationType, setAccommodationType] = useState<string>('');

	const handleAccommodationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setAccommodationType(value);
		if (value === 'House 12') {
			setMaxGuests(4);
		} else if (value === 'Loft 12') {
			setMaxGuests(2);
		} else {
			setMaxGuests(null);
		}
		onAccommodationChange(value);
	};

	const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const startDateObj = new Date(data.startDate as string);
		const endDateObj = new Date(data.endDate as string);
		const nightsDifference =
			(endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24);

		if (nightsDifference < 4) {
			alert('La estancia mínima es de 4 noches.');
			return;
		}

		const guestCount = parseInt(data.guestsNumber as string, 10);
		if (maxGuests === null) {
			alert('Por favor, seleccione un tipo de alojamiento.');
			return;
		}
		if (guestCount > maxGuests) {
			alert(`El máximo de huéspedes para ${accommodationType} es ${maxGuests}`);
			return;
		}

		try {
			const response = await fetch('/api/booking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				alert('Request sent successfully. We will contact you soon.');
				form.reset();
				setAccommodationType('');
				setMaxGuests(null);
			} else {
				alert('Error sending the request. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error');
		}
	};

	return {
		maxGuests,
		handleAccommodationTypeChange,
		handleStartDateChange,
		handleEndDateChange,
		handleSubmit,
		accommodationType,
	};
};
