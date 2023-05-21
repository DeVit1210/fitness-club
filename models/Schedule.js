import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {WorkingDaySchema} from "./WorkingDay.js";
export const ScheduleSchema = new Schema({
    workingDays: [
        {
            type: WorkingDaySchema, required: true
        }
    ]
})
export const Schedule = mongoose.model('Schedule', ScheduleSchema);