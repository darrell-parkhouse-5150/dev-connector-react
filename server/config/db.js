import mongoose from 'mongoose'
import config from 'config'

const db = config.get('mongoURI')

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopyology: true
        })
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDb;