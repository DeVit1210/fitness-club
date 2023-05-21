import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
    name: {
        type: String, required: true,
    },
    phoneNumber: {
        type: String, required: true,
    },
    time: {
        type: Date, required: true,
    }
})

export const Consultation = mongoose.model('Consultation', ConsultationSchema);