import React from 'react';

const Input = ({
	field,
	setField,
	fieldName,
	type,
	className,
	placeholder,
	autoFocus,
	disabled
}) => {
	return (
		<div className='w-full flex flex-col my-3'>
			<label htmlFor='email' className='text-gray-800 font-[500]'>
				{fieldName}
			</label>
			<input
				type={type}
				name={fieldName}
				id={fieldName}
				onChange={(e) => setField(e.target.value)}
				value={field}
				className={`${className} border-b-2 border-[#285fdd] p-1 outline-none`}
				placeholder={placeholder}
				autoFocus={autoFocus}
				disabled={disabled}
			/>
		</div>
	);
};

export default Input;
