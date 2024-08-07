import React from 'react';
import { useContactForm } from '../utils/useContactForm';
import Button from './button';

const ContactForm: React.FC = () => {
	const { handleSubmit } = useContactForm();

	return (
		<form
			onSubmit={handleSubmit}
			method="POST"
			className="pt-[70px] lg:pt-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<div className="space-y-4">
				<div>
					<label htmlFor="name" className="block mb-2 font-dm text-lg">
						Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
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
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
					/>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<label htmlFor="subject" className="block mb-2 font-dm text-lg">
						Subject:
					</label>
					<input
						type="text"
						id="subject"
						name="subject"
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
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
						required
						className="w-full px-4 py-2 border rounded-lg font-jost"
					/>
				</div>
			</div>

			<div className="md:col-span-2 lg:col-span-3">
				<label htmlFor="message" className="block mb-2 font-dm text-lg">
					Message:
				</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					required
					className="w-full px-4 py-2 border rounded-lg font-jost"
				></textarea>
			</div>

			<div className="md:col-span-2 lg:col-span-3">
				<Button text="Send Message" type="submit" />
			</div>
		</form>
	);
};

export default ContactForm;
