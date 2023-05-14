import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
    name: {
        type: String, required: true, unique: true
    },
    price: {
        type: Number, required: true
    }
})
export const Membership = mongoose.model('Membership', MembershipSchema);

const VisitMembershipSchema = new Schema({
    visitQuantity: {
        type: Number, required: true
    }
})
export const VisitMembership = Membership.discriminator('VisitMembership', VisitMembershipSchema);

const PeriodMembershipSchema = new Schema({
    monthsQuantity: {
        type: Number, required: true
    }
})
export const PeriodMembership = Membership.discriminator('PeriodMembership', PeriodMembershipSchema);

const PersonalTrainerMembershipSchema = new Schema({

})
export const PersonalTrainerMembership = Membership.discriminator('PersonalTrainerMembership', PersonalTrainerMembershipSchema);