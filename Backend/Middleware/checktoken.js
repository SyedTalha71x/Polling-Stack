import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const Secret = '3699018882';

const checktoken = async (req, res, next) => {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, Secret);
        const userID = decoded.user.id;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        if (user.role !== 'admin' && user.role !== 'user') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default checktoken;
