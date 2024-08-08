import React from 'react';
import { useContactForm } from '../utils/useContactForm';
import Button from './button';

const ContactForm: React.FC = () => {
	const {
		handleSubmit,
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
	} = useContactForm();

	return (
		<form
			onSubmit={handleSubmit}
			className="pt-[16px] lg:pt-[100px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
		>
			<div className="space-y-4 w-full">
				<div>
					<label htmlFor="name" className="block mb-2 font-dm text-lg">
						Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-2 font-dm text-lg">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost"
					/>
				</div>
			</div>

			<div className="space-y-4 w-full">
				<div>
					<label htmlFor="subject" className="block mb-2 font-dm text-lg">
						Subject:
					</label>
					<input
						type="text"
						id="subject"
						name="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
						className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost"
					/>
				</div>
				<div>
					<label htmlFor="phone" className="block mb-2 font-dm text-lg">
						Phone:
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost"
					/>
				</div>
			</div>

			<div className="md:col-span-2 w-full">
				<label htmlFor="message" className="block mb-2 font-dm text-lg">
					Message:
				</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost"
				></textarea>
			</div>

			<div className="md:col-span-2 w-full">
				<Button text="Send Message" type="submit" />
			</div>
		</form>
	);
};

export default ContactForm;
