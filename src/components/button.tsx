import ArrowPri from '../icons/arrow-pri';
import type { ButtonProps } from '../utils/types';

const Button = (props: ButtonProps) => {
	const { text = 'Default Text', type = 'button', onClick, to } = props;

	const defaultStyles =
		"rounded-[18px] flex capitalize items-center justify-center gap-[9px] w-fit text-white text-base lg:text-lg font-semibold font-['Jost'] leading-snug tracking-tight px-6 py-3 md:px-8 md:py-4";

	const className = `${defaultStyles} bg-primary-200`;

	// If there is a `to`, render a <Link> or <a>; otherwise, render a <button>
	if (to) {
		return (
			<a href={to} className={className} onClick={onClick} role="button" aria-label={text}>
				{text}
				<ArrowPri />
			</a>
		);
	}

	// Otherwise, render a <button>
	return (
		<button type={type} className={className} onClick={onClick} aria-label={text}>
			{text}
			<ArrowPri />
		</button>
	);
};

export default Button;
