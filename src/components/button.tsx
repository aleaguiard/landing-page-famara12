import ArrowPri from '../icons/arrow-pri';

export interface ButtonProps {
	text: string;
	type?: 'submit' | 'button';
	onClick?: () => void;
	to?: string;
}

const Button = (props: ButtonProps) => {
	const { text = 'Default Text', type = 'button', onClick, to } = props;

	const defaultStyles =
		"rounded-[18px] flex capitalize items-center justify-center gap-[9px] w-fit text-white text-base lg:text-lg font-semibold font-['Jost'] leading-snug tracking-tight px-10 py-5 md:px-[54px] md:py-[26px]";

	const className = `${defaultStyles} bg-primary-200`;

	return (
		<a href={to} className={className} onClick={onClick} role="button" aria-label={text}>
			{text}
			<ArrowPri />
		</a>
	);
};

export default Button;
