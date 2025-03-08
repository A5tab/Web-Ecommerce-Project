import mongoose from 'mongoose'

const mongodb_uri = process.env.MONGODB_URI
const connectDB = async () => {
    try {        
        const response  = await mongoose.connect(mongodb_uri)
        console.log("Connected to database: " , response.connection.host);
        
    } catch (error) {
        console.log("Error connecting to database");
        
    }
}

export default connectDB;