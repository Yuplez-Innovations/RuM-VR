import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../components/inputs/Input.component';

import { generateOTP, signUpUser } from '../../axios/auth.axios';

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isOTPGenerated, setIsOTPGenerated] = useState(false);
	const [generatedOTP, setGeneratedOTP] = useState(0);
	const [inputOTP, setInputOTP] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUpUser({ email, password }, inputOTP, generatedOTP)
			.then((res) => {
				navigate('/');
				dispatch({
					type: 'SET_USER',
					payload: res.data
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: 'LOGOUT' });
				navigate('/login');
			});
	};

	const handleOTPGeneration = async (email) => {
		setIsOTPGenerated(true);
		await generateOTP(email)
			.then((res) => {
				setGeneratedOTP(res.data.otp);
			})
			.catch((err) => {
				setIsOTPGenerated(false);
			});
	};

	return (
		<div className='flex w-screen h-screen items-center justify-between'>
			<img
				src='https://images.pexels.com/photos/7561807/pexels-photo-7561807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
				alt='img'
				className='w-1/2 h-screen object-cover object-center'
			/>
			<div className='w-full h-screen flex justify-center items-center'>
				<div className='flex items-center justify-center flex-col w-[60%] h-full'>
					<h1 className='self-start font-bold text-4xl text-[#285fdd] mb-3'>
						SIGN UP
					</h1>
					<form
						onSubmit={(e) => handleSubmit(e)}
						className='flex items-center self-start flex-col w-full'
					>
						<Input
							field={email}
							setField={setEmail}
							type='email'
							fieldName='Email'
							className=''
							placeholder='example@domain.com'
							autoFocus
						/>
						<Input
							field={password}
							setField={setPassword}
							type='password'
							fieldName='Password'
							className=''
							placeholder='********'
						/>
						<Input
							field={confirmPassword}
							setField={setConfirmPassword}
							type='password'
							fieldName='Confirm Password'
							className=''
							placeholder='********'
						/>
						<div className='flex w-full '>
							<Input
								field={inputOTP}
								setField={setInputOTP}
								type='text'
								fieldName='OTP'
								placeholder='Enter OTP'
								disabled={
									!(
										email.indexOf('@') < 0 &&
										email.indexOf('.') < 0 &&
										email.indexOf(' ') < 0
									)
										? isOTPGenerated && generatedOTP
											? false
											: true
										: true
								}
							/>
							<button
								type='button'
								className='bg-[#285fdd] text-white p-1 rounded shadow-lg w-fit self-end my-3 px-5 ml-3'
								disabled={
									!(
										email.indexOf('@') < 0 &&
										email.indexOf('.') < 0 &&
										email.indexOf(' ') < 0
									)
										? isOTPGenerated
										: true
								}
								onClick={() => {
									handleOTPGeneration(email);
								}}
							>
								{generatedOTP ? 'SENT' : 'SEND'}
							</button>
						</div>
						<button
							className='bg-[#285fdd] text-white p-2 w-full rounded shadow-lg mt-3'
							disabled={
								!(password === confirmPassword) ||
								!(parseInt(inputOTP) === generatedOTP)
							}
						>
							SIGN UP
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
