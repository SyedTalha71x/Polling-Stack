import express from "express";
const router = express.Router();

import { addnewpoll, fetchallpolls } from "../Controllers/pollcontroller.js";
import checktoken from "../Middleware/checktoken.js";

router.post('/addpolls', checktoken, addnewpoll);
router.get('/fetchall', fetchallpolls)

export default router