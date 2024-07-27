import mongoose from 'mongoose'

const checkObjId = (id) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[id]))
        return res.status(400).json({ msg: 'invalid id' })
}

module.exports = checkObjId