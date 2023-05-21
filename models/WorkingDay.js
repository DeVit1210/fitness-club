import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const WorkingDaySchema = new Schema({
    name: {
        type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true
    },
    workingPeriodMap: {
        type: Map, value: Boolean
    }
})

export const WorkingDay = mongoose.model('WorkingDay', WorkingDaySchema);