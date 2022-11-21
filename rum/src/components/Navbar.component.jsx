import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/logo.png';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div className='flex items-center justify-center w-full h-[5rem] shadow-md bg-white'>
			<div className='flex flex-1 items-center justify-between max-w-5xl w-full px-9'>
				<div>
					<img src={Logo} alt='img' className='w-[7rem]' />
				</div>
				<div
					onClick={() => {
						dispatch({ type: 'LOGOUT' });
						navigate('/login');
					}}
				>
					Logout
				</div>
			</div>
		</div>
	);
};

export default Navbar;
