import {ConfirmedMembership} from "../models/ConfirmedMembership.js";
import {getSchemaNameFromType} from "./MembershipController.js";
import {Membership} from "../models/Membership.js";

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