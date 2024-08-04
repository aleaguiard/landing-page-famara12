import Button from './button';

const ContactForm = () => {
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const subject = e.target.subject.value;
		const phone = e.target.phone.value;
		const message = e.target.message.value;

		const mailtoLink = `mailto:famarahouse12@gmail.com?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
		)}`;

		window.location.href = mailtoLink;
	};

	return (
		<div className="col-span-1 lg:col-span-2">
			<form
				className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-[50px] px-4 lg:px-0"
				onSubmit={handleSubmit}
			>
				<label htmlFor="name">
					<input
						type="text"
						name="name"
						className="border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
						placeholder="Name"
						required
					/>
				</label>
				<label htmlFor="email">
					<input
						type="email"
						name="email"
						className="border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
						placeholder="Email"
						required
					/>
				</label>
				<label htmlFor="subject">
					<input
						type="text"
						name="subject"
						className="border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
						placeholder="Subject"
						required
					/>
				</label>
				<label htmlFor="phone">
					<input
						type="number"
						name="phone"
						className="border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
						placeholder="Phone"
						required
					/>
				</label>
				<textarea
					name="message"
					className="col-span-2 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
					cols={30}
					rows={8}
					placeholder="Hello, I would like to know more about..."
					required
				></textarea>

				<div className="w-full flex justify-end col-span-2">
					<Button text="Send Message" type="submit" />
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
