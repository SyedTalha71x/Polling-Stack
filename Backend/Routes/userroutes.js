import express from "express";
import {
    signup,
    login,
    fetchuser
} from "../Controllers/usercontroller.js";

import checktoken from '../Middleware/checktoken.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getuser', checktoken, fetchuser);

export default router;