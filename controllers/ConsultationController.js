import {Consultation} from "../models/Consultation.js";

export const add = (req, res) => {
    Consultation.create(req.body)
        .then(() => res.json('consultation created successfully!'))
        .catch(err => res.status(400).send(err.message));
}

export const findAll = (req, res) => {
    Consultation.find().sort()
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message));
}

export const destroy = (req, res) => {
    Consultation.findByIdAndRemove(req.params.id)
        .then(() => res.json('consultation deleted successfully!'))
        .catch(err => res.status(400).send(err.message));
}