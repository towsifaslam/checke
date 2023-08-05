import express from'express';
const router = express.Router()

import {singin, singup} from'../controllers/user.js';

router.post('/singup',singup)
router.post('/singin',singin)

export default router