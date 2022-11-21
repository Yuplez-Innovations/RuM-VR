import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../components/inputs/Input.component';

import { loginUser } from '../../axios/auth.axios';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginUser({ email, password })
			.then((res) => {
				dispatch({
					type: 'SET_USER',
					payload: res.data
				});
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: 'LOGOUT' });
				navigate('/login');
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
						LOGIN
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
						<button className='bg-[#285fdd] text-white p-2 w-full rounded shadow-lg mt-3'>
							LOGIN
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
