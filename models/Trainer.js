import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
    surname: {
        type: String, required: true,
    },
    name: {
        type: String, required: true,
    },
    education: {
        type: String, required: true,
    },
    experience: {
        type: Number, required: true,
    },
    additionalInformation: {
        type: String, required: true
    },
    workingDays: [ { type: String } ]
})

export const Trainer = mongoose.model('Trainer', TrainerSchema);