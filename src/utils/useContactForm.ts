import { useState } from 'react';

export const useContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		const formData = {
			name,
			email,
			phone,
			subject,
			message,
		};

		try {
			await submitForm(formData);
			clearForm();
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
			console.error('Error submitting form:', error);
		}
	};

	const submitForm = async (formData: any) => {
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert('Request sent successfully. We will contact you soon.');
				clearForm();
			} else {
				alert('Error sending the request. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error');
		}
	};

	const clearForm = () => {
		setName('');
		setEmail('');
		setPhone('');
		setSubject('');
		setMessage('');
	};

	return {
		handleSubmit,
		isSubmitting,
		name,
		setName,
		email,
		setEmail,
		phone,
		setPhone,
		subject,
		setSubject,
		message,
		setMessage,
	};
};
