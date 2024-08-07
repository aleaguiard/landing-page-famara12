import { useState, useEffect } from 'react';

export const useBookingForm = () => {
	const [maxGuests, setMaxGuests] = useState(4);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const handleAccommodationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		if (value === 'House 12') {
			setMaxGuests(4);
		} else if (value === 'Loft 12') {
			setMaxGuests(2);
		}
	};

	const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(event.target.value);
	};

	useEffect(() => {
		if (startDate) {
			const minEndDate = new Date(startDate);
			minEndDate.setDate(minEndDate.getDate() + 4);
			const endDateInput = document.getElementById('endDate') as HTMLInputElement;
			if (endDateInput) {
				endDateInput.min = minEndDate.toISOString().split('T')[0];
			}
		}
	}, [startDate]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		// Validaciones adicionales
		const startDateObj = new Date(data.startDate as string);
		const endDateObj = new Date(data.endDate as string);
		const nightsDifference =
			(endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24);

		if (nightsDifference < 4) {
			alert('La estancia mínima es de 4 noches.');
			return;
		}

		if (parseInt(data.guestsNumber as string) > maxGuests) {
			alert(`El número máximo de huéspedes para ${data.accommodationType} es ${maxGuests}.`);
			return;
		}

		try {
			const response = await fetch('/api/sendEmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				alert(
					'Solicitud enviada correctamente. Se ha enviado un correo con los detalles de la reserva.'
				);
				form.reset();
			} else {
				alert('Error al enviar la solicitud');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error al enviar la solicitud');
		}
	};

	return {
		maxGuests,
		handleAccommodationTypeChange,
		handleStartDateChange,
		handleEndDateChange,
		handleSubmit,
	};
};
