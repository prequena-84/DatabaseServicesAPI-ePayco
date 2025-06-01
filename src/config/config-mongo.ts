import mongoose from "mongoose"
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname,'../../.env') })

const uriMongoDB = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.KEY_MONGODB}@${process.env.CLOUSTER_OPERATIONS}${process.env.URI_MONGO}${process.env.CLOUSTER_OPERATIONS}`

const connectDB = async ():Promise<void> => {
    try {
        await mongoose.connect(uriMongoDB)
    } catch(err) {
        console.error('Error al intentar de conectarse a Mongoose: ', err )
    }
}

export {
    mongoose,
    connectDB,
}