import { useState } from 'react';

export const useContactForm = () => {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				alert('Message sent successfully. We will contact you soon.');
				form.reset();
			} else {
				alert('Error sending the message. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error sending the message. Please try again.');
		}
	};

	return {
		handleSubmit,
	};
};
