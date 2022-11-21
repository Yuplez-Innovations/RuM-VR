const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var uniqid = require('uniqid');

const { User } = require('../database/database')
const { transporter } = require('../utils/nodemailer.util')

exports.signUpPost = async (req, res) => {
    try {
        const { email, password, otp, confirmOTP } = req.body;
        if (parseInt(otp) !== confirmOTP) {
            return res.status(500).json('Invalid OTP. Please enter the OTP which is sent to your mail.')
        }

        let user = await User.findOne({ email, raw: true })

        if (user) return res.status(500).json({
            error: 'User already exists'
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user_id = uniqid()

        user = await User.create({
            id_user: user_id,
            name: email.split('@')[0],
            email,
            password: hash
        })

        const token = jwt.sign({
            user_id: user.user_id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.loginPost = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email, raw: true })

        if (!user) return res.status(500).json({ error: 'User does not exist' })

        if (!bcrypt.compareSync(password, user.password))
            return res.status(500).json({
                error: 'Invalid email or password'
            });

        const token = jwt.sign({
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.forgotPost = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.count({ where: { email } })

        if (!user) return res.status(500).json({ error: 'User does not exist' })
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Reset your Mizule Account's password",
            html: `<p><a href='${process.env.BASE_URL}/app/${results[0].user_id}'>Click here</a> to reset your Mizule Account's password</p>`,
        });
        res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { user_id, password } = req.body

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let user = await User.findByPk(user_id)

        if (!user) return res.status(500).json({ error })

        user = await User.update({ password: hash }, { where: { id: user_id } })
        res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.validateUser = async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token.split('Bearer ')[1], process.env.SECRET, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: 'Failed to authenticate token'
                });
            }
            req.user = decoded;
            res.json({
                ...decoded, token
            })
        });
    } else {
        return res.status(401).json({
            error: 'No token provided'
        });
    }
}

exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.count({ where: { email } })
        if (user) return res.status(404).json({ error: 'User already found' })
        const otp = Math.floor(100000 + Math.random() * 900000)
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Register your Mizule Account",
            html: `<p>${otp} is the OTP to register your Mizule account. The OTP is valid only for 2 minutes.</p>`,
        });
        return res.json({ otp })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}