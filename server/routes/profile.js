import {express} from 'express'
import axios from 'axios'

const router = express.Router()

import { auth } from '../middleware/auth'
import { check, validationResult } from 'express-validator'

import normalize from 'normalize-url'
import { CheckObjId } from '../middleware/checkObjId'

import Profile from '../models/Profile'
import User from '../models/User'
import Post from '../models/Post'

//? get current profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.use.id
        }).popular('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'there is not profile for this user'})
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})