import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    phoneNumber: {
        type: String, required: true
    },
    surname: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    }
})
export const User = mongoose.model('User', UserSchema);