import {
    ConfirmedMembership,
    ConfirmedPeriodMembership,
    ConfirmedPersonalTrainerMembership,
    ConfirmedVisitMembership
} from "../models/ConfirmedMembership.js";
import {getSchemaNameFromType} from "./MembershipController.js";
import {Membership, PeriodMembership, PersonalTrainerMembership, VisitMembership} from "../models/Membership.js";
import {User} from "../models/User.js";
import {Trainer} from "../models/Trainer.js";
import {checkAuthentication} from "./UserController.js";

function getMembershipType(membership){
    if(membership instanceof VisitMembership) {
        return 'visit';
    } else if(membership instanceof PeriodMembership) {
        return 'period';
    } else if(membership instanceof PersonalTrainerMembership) {
        return 'trainer';
    } else return 'undefined';
}

export function getSchemaFromConfirmedMembershipType(type) {
    if(type === 'Все') return 'Все';
    switch (type) {
        case 'visit': return 'ConfirmedVisitMembership';
        case 'period': return 'ConfirmedPeriodMembership';
        case 'trainer': return 'ConfirmedPersonalTrainerMembership';
    }
}

async function generateMembershipData(membership, data, callback) {
    const membershipType = getMembershipType(membership);
    const membershipData = {
        membership: membership,
        user: data.userId,
        dateFrom: new Date(data.dateFrom),
        confirmationDate: Date.now(),
        status: new Date().getDay() === new Date(data.dateFrom).getDay() ? 'active' : 'future',
    }
    switch (membershipType) {
        case 'visit': {
            membershipData.leftVisitQuantity = membership.visitQuantity
            membershipData.address = data.address
            callback(null, new ConfirmedVisitMembership(membershipData));
            break;
        }
        case 'period': {
            membershipData.dateTo = new Date(membershipData.dateFrom)
            membershipData.dateTo.setDate(membershipData.dateTo.getDate() + (membership.monthsQuantity * 30))
            membershipData.address = data.address
            callback(null, new ConfirmedPeriodMembership(membershipData));
            break;
        }
        case 'trainer': {
            membershipData.trainer = data.trainer;
            membershipData.trainingDays = data.trainingDays;
            membershipData.trainingPeriod = data.trainingPeriod;
            membershipData.dateTo.setDate(membershipData.dateTo.getDate() + (membership.monthsQuantity * 30))
            await Trainer.findByIdAndUpdate(data.trainer, {$inc: {clientQuantity: 1}})
            callback(null, new ConfirmedPersonalTrainerMembership(membershipData));
            break;
        }
        default:
            callback('wrong membership type', null);
    }
}

export const findAll = (req, res) => {
    ConfirmedMembership.find()
        .populate({path: 'user', select: "surname name"})
        .populate({path: 'membership', select: "name price"})
        .then(response => res.json(response))
        .catch(err => res.json(400).send(err.message));
}

export const findByType = (req, res) => {
    ConfirmedMembership.find({__t: getSchemaNameFromType(req.params.type)})
        .then(response => res.json(response))
        .catch(err => res.json(400).send(err.message));
}

export const add = async (req, res) => {
    await checkAuthentication(req.headers.authorization, (user, errMessage) => {
        if(errMessage) {
            res.status(400).send(errMessage);
        } else Membership.findById(req.params.membershipId)
            .then(membership => {
                const data = req.body;
                data.userId = user.id;
                generateMembershipData(membership, data, async (errMessage, confirmedMembership) => {
                    if (errMessage) {
                        res.status(400).send(errMessage);
                    } else {
                        await confirmedMembership.save();
                        await User.findByIdAndUpdate(user.id, {$push: {memberships: confirmedMembership._id}})
                        res.send("confirmed membership added successfully!");
                    }
                })
            })
            .catch(() => res.status(400).send("invalid membership id"))
    })
}
export const destroy = async (req, res) => {
    await checkAuthentication(req.headers.authorization, (user, errMessage) => {
        if (errMessage) {
            res.status(400).send(errMessage);
        } else Membership.findByIdAndDelete(req.params.membershipId)
            .then(() => res.json("membership has been successfully deleted!"))
            .catch(() => res.status(400).send("invalid membership id"))
    })
}
async function findBetween(start, end, callback) {
    const startParts = start.split('/');
    const startDate = new Date(+startParts[2], startParts[1] - 1, +startParts[0]);
    const endParts = end.split('/');
    const endDate = new Date(+endParts[2], endParts[1] - 1, +endParts[0]);
    const memberships =
        await ConfirmedMembership.find({confirmationDate: {$gte: startDate, $lte: endDate}})
            .populate({path: 'user', select: 'surname name'})
            .populate({path: 'membership', select: 'name price'})
    callback(memberships);
}

export const findBetweenWithType = async (req, res) => {
    await findBetween(req.body.startDate, req.body.endDate, (response) => {
        console.log(req.body.type);
        if (req.body.type && req.body.type !== 'Все') {
            res.json(response.filter(item => item.__t === getSchemaFromConfirmedMembershipType(req.body.type)))
        } else res.json(response);
    })
}

export const findBetweenWithTypeTotalValue = (req, res) => {
    findBetween(req.body.startDate, req.body.endDate).then(memberships => {
        if (req.body.type) {
            const filtered = memberships.filter(item => item.__t === getSchemaNameFromType(req.body.type))
            res.json(filtered.reduce((accumulator, currentItem) => accumulator + currentItem.membership.price, 0))
        } else res.json(memberships);
    }).catch(err => res.status(400).send(err.message));
}

export const findAllSorted = (req, res) => {
    const sortRule = {};
    const requestBody = req.body;
    Object.keys(requestBody).forEach((key) => sortRule[key] = requestBody[key] === 'true' ? 1 : -1);
    ConfirmedMembership.find().sort(sortRule)
        .then(response => res.json(response))
        .catch(err => res.json(400).send(err.message));
}

export const findWithUser = async (req, res) => {
    const token = req.headers.authorization;
    await checkAuthentication(token, (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else ConfirmedMembership.find({user: user._id})
            .populate({path: 'membership', select: 'name price'})
            .populate({path: 'trainer', select: 'surname name address'})
            .then(memberships => res.json(memberships))
            .catch(err => res.status(400).send(err.message))
    })
}

export const findWithUserAndType = (req, res) => {
    const {userId, type} = req.body;
    ConfirmedMembership.find({__t: getSchemaFromConfirmedMembershipType(type), user: userId})
        .then(memberships => res.json(memberships))
        .catch(err => res.status(400).send(err.message));
}

export const decreaseQuantity = (req, res) => {
    const membershipId = req.params.id;
    ConfirmedMembership.findById(membershipId).then( membership => {
        console.log(membership);
        if(membership.leftVisitQuantity - 1 === 0) {
            membership.status = 'expired';
            membership.leftVisitQuantity = 0;
        } else membership.leftVisitQuantity--;
        console.log(membership);
        membership.save().then(() => res.json('left visit quantity has been decreased'));
    }).catch(err => res.status(400).send(err.message));
}


