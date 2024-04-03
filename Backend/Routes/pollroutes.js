import express from "express";
const router = express.Router();

import { addnewpoll, fetchallpolls, voteonPoll, fetchspecific } from "../Controllers/pollcontroller.js";
import checktoken from "../Middleware/checktoken.js";

router.post('/addpolls', checktoken, addnewpoll);
router.get('/fetchall', fetchallpolls)
router.post('/vote', checktoken, voteonPoll)
router.get('/fetchspecificpoll/:id', fetchspecific)

export default router