import {Membership, PeriodMembership, PersonalTrainerMembership, VisitMembership} from "../models/Membership.js";
import {response} from "express";

export const findAll = (req, res) => {
    Membership.find()
        .then(response => res.json(response))
        .catch(err => res.json(400).send(err.message));
}

export const findByType = (req, res) => {
    Membership.find({__t: req.params.type})
        .then(response => res.json(response))
        .catch(err => res.json(400).send(err.message));
}

export const add = (req, res) => {
    const type = req.params.type;
    switch (type) {
        case "period": {
            const periodMembership = new PeriodMembership(req.body);
            periodMembership.save().then(res.status(200).message("period membership added successfully!"))
            break;
        }
        case "visit": {
            const visitMembership = new VisitMembership(req.body);
            visitMembership.save().then(res.status(200).message("visit membership added successfully!"))
            break;
        }
        case "trainer": {
            const trainerMembership = new PersonalTrainerMembership(req.body);
            trainerMembership.save().then(res.status(200).message("trainer membership added successfully!"))
            break;
        }
        default: res.status(400).send("wrong membership type");
    }
}

export const update = (req, res) => {
    Membership.findByIdAndUpdate(req.params.id, {$set: req.body})
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}

export const destroy = (req, res) => {
    Membership.findByIdAndDelete(req.params.id)
        .then(() => res.message("membership deleted successfully!"))
        .catch(err => res.status(400).send(err.message))
}

export const findById = (req, res) => {
    Membership.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}