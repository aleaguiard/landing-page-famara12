import React from 'react';

interface FloatingLabelInputProps {
	id: string;
	label: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
	id,
	label,
	type = 'text',
	value,
	onChange,
	required = false,
}) => {
	return (
		<div className="relative w-full">
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				required={required}
				className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-black outline-none font-jost placeholder-transparent"
				placeholder=" "
			/>
			<label
				htmlFor={id}
				className={`absolute left-4 transition-all duration-200 ${
					value ? 'top-[-10px] text-xs' : 'top-2 text-lg'
				}`}
			>
				{label}
			</label>
		</div>
	);
};

export default FloatingLabelInput;
