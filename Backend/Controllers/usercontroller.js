import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Secret = '3699018882';

export const signup = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'Sorry a user is already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, salt);

        let newRole;
        if (req.body.role === 'admin') {
            newRole = 'admin';
        }
        else {
            newRole = 'user';
        }

        user = await User({
            email: req.body.email,
            name: req.body.name,
            password: hashpass,
            role: newRole,
        })
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, Secret)
        res.status(200).json({ message: 'User has been created', AuthToken });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Sorry a user is already exists' })
        }

        const comparepass = await bcrypt.compare(password, user.password);
        if (!comparepass) {
            return res.status(401).json({ message: 'Invalid Credienrials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, Secret);
        res.status(200).json({ AuthToken });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }
}

export const fetchuser = async (req, res) => {
    try {
        const userID = req.user.id
        const user = await User.findById(userID);
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }
}