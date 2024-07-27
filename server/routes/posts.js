import express from 'express'
const router = express.Router()
import { check, validationResult } from 'express-validator'

import Post from './models/Post'
import User from './models/User'

import CheckObjId from '../middleware/checkObjId'
import { checkout } from '../src'

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

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        req.json(posts);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})
router.get('/:id', auth, CheckObjId, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post)
            return res.status(404).json({ msg: 'post not found' })

        res.json(post)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('intneral server error')
    }
})
module.exports = router