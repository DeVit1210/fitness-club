import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {ScheduleSchema} from "./Schedule.js";

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
    schedule: {
        type: ScheduleSchema
    }
})

export const Trainer = mongoose.model('Trainer', TrainerSchema);

// TODO: add working days regulation