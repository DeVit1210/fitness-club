import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConfirmedMembershipSchema = new Schema({
    membership: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Membership'
    },
    dateFrom: {
        type: Date, required: true
    }
})
export const ConfirmedMembership =
    mongoose.model('ConfirmedMembership', ConfirmedMembershipSchema);

const ConfirmedVisitMembershipSchema = new Schema({
    leftVisitQuantity: {
        type: Number, required: true
    }
})
export const ConfirmedVisitMembership =
    mongoose.model('ConfirmedVisitMembership', ConfirmedVisitMembershipSchema);

const ConfirmedPeriodMembershipSchema = new Schema({
    dateTo: {
        type: Date, required: true
    }
})
export const ConfirmedPeriodMembership =
    mongoose.model('ConfirmedPeriodMembership', ConfirmedPeriodMembershipSchema);

const ConfirmedPersonalTrainerMembershipSchema = new Schema({
    // TODO: add Trainer reference and days of training
})

export const ConfirmedPersonalTrainerMembership =
    mongoose.model('ConfirmedPersonalTrainerMembership', ConfirmedPersonalTrainerMembershipSchema)

