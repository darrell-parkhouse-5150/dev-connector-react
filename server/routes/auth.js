import { check, validationResult } from 'express-validator'

import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs'
import auth from '../middleware/auth'
import jwt from 'jsonwebtokens'
import config from 'config'

import User from '../models/User'

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(503).json({ msg: "internal server error"})
    }
})