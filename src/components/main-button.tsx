import ArrowPri from '../icons/arrow-pri';
import type { Button } from '../utils/types';

const MainButton = (props: Button) => {
	const { text = 'Default Text', type = 'button', onClick, to, className = '' } = props;

	const defaultStyles =
		'mt-10 px-6 py-3 border border-white text-white rounded-full hover:bg-primary-200 hover:text-white transition duration-300 flex items-center gap-4 font-extralight';

	const combinedStyles = `${defaultStyles} ${className}`;

	if (to) {
		return (
			<a
				href={to}
				className={combinedStyles}
				onClick={onClick}
				role="button"
				aria-label={text}
			>
				{text}
				<ArrowPri />
			</a>
		);
	}

	return (
		<button type={type} className={combinedStyles} onClick={onClick} aria-label={text}>
			{text}
			<ArrowPri />
		</button>
	);
};

export default MainButton;
