import jwt from 'jwt'
import config from 'config'

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            msg: 'no token, authorization denied'
        })
    }

    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    msg: 'token is not valie'
                })
            } else {
                req.user = decoded.user
                next();
            }
        })
    } catch (error) {
        console.error('something sent wrong auth middleware')
        res.status(503).json({
            msg: 'Internal server Error'
        })
    }

    
}