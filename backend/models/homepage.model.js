import mongoose from "mongoose"

const homepageSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: [true, 'At least one homepage image is required']
    }]
})

export default mongoose.model('Homepage', homepageSchema)