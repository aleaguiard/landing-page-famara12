import React from 'react';
import { useContactForm } from '../utils/useContactForm';
import Button from './button';
import FloatingLabelInput from './floating-label-input';

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
			className="pt-[40px] lg:pt-[80px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
		>
			<div className="space-y-4 w-full">
				<FloatingLabelInput
					id="name"
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<FloatingLabelInput
					id="email"
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className="space-y-4 w-full">
				<FloatingLabelInput
					id="subject"
					label="Subject"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
				/>
				<FloatingLabelInput
					id="phone"
					label="Phone"
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
					required
				/>
			</div>

			<div className="md:col-span-2 w-full relative space-y-2">
				<textarea
					id="message"
					name="message"
					rows={5}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost placeholder-transparent resize-none bg-transparent"
					placeholder=" "
				></textarea>
				<label
					htmlFor="message"
					className={`absolute left-4 transition-all duration-200 ${
						message ? 'top-[-10px] text-xs' : 'top-2 text-lg'
					}`}
				>
					Message:
				</label>
			</div>

			<div className="md:col-span-2 w-full">
				<Button text="Send Message" type="submit" />
			</div>
		</form>
	);
};

export default ContactForm;
