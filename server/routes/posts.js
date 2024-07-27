import express from 'express'
const router = express.Router()
import { check, validationResult } from 'express-validator'

import Post from './models/Post'
import User from './models/User'

import CheckObjId from '../middleware/checkObjId'

router.post('/', auth, check('text', 'text is required').notEmpty(), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error');
    }
})
module.exports = router