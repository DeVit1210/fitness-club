import {Trainer} from "../models/Trainer.js";

export const findAll = (req, res) => {
    Trainer.find()
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}
export const find = (req, res) => {
    Trainer.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}
export const destroy = (req, res) => {
    Trainer.findByIdAndDelete(req.params.id)
        .then(() => res.json("trainer successfully deleted"))
        .catch(err => res.status(400).send(err.message))
}

export const add = (req, res) => {
    Trainer.create(req.body)
        .then(() => res.json("trainer successfully added!"))
        .catch(err => res.status(400).send(err.message));
}