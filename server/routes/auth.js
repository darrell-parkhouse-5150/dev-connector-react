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

router.post('/',
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials'}]})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, config.get('jwtSecret'), { expiresIn: '5 days' }, (err, token) => {
                    if (err) throw err;

                    res.json({token});
                }
            )
        } catch (error) {
            console.error(error.message)
            res.status(500).send('server error')
        }
    }
)

module.exports = router;