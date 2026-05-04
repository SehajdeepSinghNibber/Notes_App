import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, config.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: config.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return token;
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            generateToken(user._id, res);
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                message: "User registered successfully"
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            generateToken(user._id, res);
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                message: "Logged in successfully"
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const authCheck = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
