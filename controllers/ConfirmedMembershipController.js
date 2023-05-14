import {ConfirmedMembership, ConfirmedPeriodMembership, ConfirmedPersonalTrainerMembership, ConfirmedVisitMembership} from "../models/ConfirmedMembership.js";
import {getSchemaNameFromType} from "./MembershipController.js";
import {Membership, PeriodMembership, VisitMembership, PersonalTrainerMembership} from "../models/Membership.js";
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
    await checkAuthentication(req.params.token, (user, errMessage) => {
        if(errMessage) {
            res.status(400).send(errMessage);
        } else Membership.findById(req.params.membershipId)
            .then(membership => {
                generateMembershipData(membership, req.body, async (errMessage, data) => {
                    if (errMessage) {
                        res.status(400).send(errMessage);
                    } else {
                        await membership.save();
                        await User.findByIdAndUpdate(user.id, {$push: {memberships: membership}})
                        res.send("confirmed membership added successfully!");
                    }
                })
            })
            .catch(() => res.status(400).send("invalid membership id"))
    })
}
