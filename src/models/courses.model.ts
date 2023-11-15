import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

})

export const courseModel = mongoose.model('Course', courseSchema)

