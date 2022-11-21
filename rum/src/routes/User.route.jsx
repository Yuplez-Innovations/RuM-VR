import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLocation, Outlet } from 'react-router-dom';

import { validateUser } from '../axios/auth.axios';

const UserRoute = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (user && user.token) {
			validateUser(user.token)
				.then((res) => {
					if (!res.data.token.length) {
						dispatch({ type: 'SET_USER', payload: null });
						navigate('/login');
					}
				})
				.catch((err) => {
					console.log(err);
					dispatch({ type: 'SET_USER', payload: null });
				});
		} else {
			if (location.pathname !== '/login') {
				navigate('/login');
			}
		}
	}, [dispatch, user, location.pathname, navigate]);
	return user && user.token?.length ? <Outlet /> : <Navigate to='login' />;
};

export default UserRoute;
