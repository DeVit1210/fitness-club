import {
    ConfirmedMembership,
    ConfirmedPeriodMembership,
    ConfirmedPersonalTrainerMembership,
    ConfirmedVisitMembership
} from "../models/ConfirmedMembership.js";
import {getSchemaNameFromType} from "./MembershipController.js";
import {Membership, PeriodMembership, PersonalTrainerMembership, VisitMembership} from "../models/Membership.js";
import {User} from "../models/User.js";
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

function generateMembershipData(membership, requestBody, callback) {
    const membershipType = getMembershipType(membership);
    const membershipData = {
        membership: membership,
        dateFrom: new Date(requestBody.dateFrom),
        confirmationDate: Date.now(),
        status: new Date().getDay() === new Date(requestBody.dateFrom).getDay() ? 'active' : 'future',
    }
    switch (membershipType) {
        case 'visit': {
            membershipData.leftVisitQuantity = membership.visitQuantity
            callback(null, new ConfirmedVisitMembership(membershipData)); break;
        }
        case 'period': {
            membershipData.dateTo = new Date(membershipData.dateFrom + membership.monthsQuantity * 30);
            callback(null, new ConfirmedPeriodMembership(membershipData)); break;
        }
        case 'trainer': {
            membershipData.trainer = requestBody.trainer;
            callback(null, new ConfirmedPersonalTrainerMembership(membershipData)); break;
        }
        default: callback('wrong membership type', null);
    }
}

export const findAll = (req, res) => {
    ConfirmedMembership.find()
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
                generateMembershipData(membership, req.body, async (errMessage, confirmedMembership) => {
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
async function findBetween(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    await ConfirmedMembership.findOne({confirmationDate: {$gte: startDate, $lte: endDate}});
}

export const findBetweenWithType = (req, res) => {
    findBetween(req.body.startDate, req.body.endDate).then(response => {
        if (req.body.type) {
            res.json(response.filter(item => item.__t === getSchemaNameFromType(req.body.type)))
        } else res.json(response);
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