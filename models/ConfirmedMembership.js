import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConfirmedMembershipSchema = new Schema({
    membership: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Membership'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    dateFrom: {
        type: Date, required: true
    },
    confirmationDate: {
        type: Date, required: true
    },
    status: {
        type: String, enum: ['future', 'active', 'frozen', 'expired'], required: true
    }
})
export const ConfirmedMembership =
    mongoose.model('ConfirmedMembership', ConfirmedMembershipSchema);

const ConfirmedVisitMembershipSchema = new Schema({
    leftVisitQuantity: {
        type: Number, required: true
    },
    address: {
        type: String, required: true
    }
})
export const ConfirmedVisitMembership =
    ConfirmedMembership.discriminator('ConfirmedVisitMembership', ConfirmedVisitMembershipSchema);

const ConfirmedPeriodMembershipSchema = new Schema({
    dateTo: {
        type: Date, required: true
    },
    address: {
        type: String, required: true
    }
})
export const ConfirmedPeriodMembership =
    ConfirmedMembership.discriminator('ConfirmedPeriodMembership', ConfirmedPeriodMembershipSchema);

const ConfirmedPersonalTrainerMembershipSchema = new Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true
    },
    trainingDays: {
        type: String, required: true,
    },
    trainingPeriod: {
        type: String, required: true,
    },
    dateTo: {
        type: Date, required: true
    }
})

export const ConfirmedPersonalTrainerMembership =
    ConfirmedMembership.discriminator('ConfirmedPersonalTrainerMembership', ConfirmedPersonalTrainerMembershipSchema)

