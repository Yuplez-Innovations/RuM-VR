import axios from 'axios'

import { BASE_URL } from '../utils/constants.util'

export const loginUser = async (values) =>
    await axios.post(`${BASE_URL}/login`, {
        ...values
    })

export const signUpUser = async (values, otp, confirmOTP) =>
    await axios.post(`${BASE_URL}/signup`, {
        ...values, otp, confirmOTP
    })

export const generateOTP = async (email) =>
    axios.post(`${BASE_URL}/user/validate`, { email })

export const validateUser = async (token) =>
    axios.get(`${BASE_URL}/user/validate`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    )