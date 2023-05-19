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

export const findDecreaseSort = (req, res) => {
    Trainer.find().sort({clientQuantity: -1})
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}

export const findIncreaseSort = (req, res) => {
    Trainer.find().sort({clientQuantity: 1})
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}

export const update = (req, res) => {
    Trainer.findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}


/////////////////////////////////////////////////////////////////////////

class PeriodData {
    constructor(trainerId, trainerFullName, timePeriod, days) {
        this.trainerId = trainerId;
        this.trainerFullName = trainerFullName;
        this.timePeriod = timePeriod;
        this.days = days;
    }
}

function getShortcutsString(names) {
    return names.map(name => getDayNameShortcut(name)).join("/");
}

function getDayNameShortcut(name) {
    switch (name) {
        case 'Monday': return 'ПН';
        case 'Tuesday': return 'ВТ';
        case 'Wednesday': return 'СР';
        case 'Thursday': return 'ЧТ';
        case 'Friday': return 'ПТ';
        case 'Saturday': return 'СБ';
        case 'Sunday': return 'ВС';
    }
}

function getPeriods(isFree, callback) {
    Trainer.find().then(trainers => {
        const freePeriods = [];
        trainers.forEach(trainer => {
            const workingDays = trainer.schedule.workingDays;
            workingDays[0].workingPeriodMap.forEach((key, value) => {
                if (isFree ? !key : key) {
                    freePeriods.push(new PeriodData(
                        trainer._id,
                        trainer.surname + " " + trainer.name,
                        value,
                        getShortcutsString(workingDays.map(day => day.name))
                    ));
                }
            })
        })
        callback(freePeriods);
    });
}

export const getFreePeriods = (req, res) => {
    getPeriods(true, (periods) => res.json(periods));
}

export const getBusyPeriods = (req, res) => {
    getPeriods(false, (periods) => res.json(periods));
}