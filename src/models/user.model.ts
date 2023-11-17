import mongoose from "mongoose"
import validator from "validator"
import { userRouter } from "../routes/user.route"
import { Roles } from "../utils/userRoles"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'filed must be a valid email address']
    },

    password: {
        type: String,
        required: true,
    },

    passwordChangedAt: {
        type: Date
    },

    token: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [Roles.USER, Roles.ADMIN, Roles.MANAGER],
        default: Roles.USER
    },

    active: {
        type: Boolean,
        default: true
    }
})

export const userModel = mongoose.model('User',userSchema)