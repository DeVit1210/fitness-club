import {Schedule} from "../models/Schedule.js";
import {Trainer} from "../models/Trainer.js";
import {WorkingDay} from "../models/WorkingDay.js";
import {checkAuthentication} from "./UserController.js";

export const add = async (req, res) => {
    const workingDayNames = req.body.workingDays;
    const workingDays = [];
    workingDayNames.forEach(name => {
        const periodMap = {
            "9:00 - 10:30": false,
            "11:00 - 12:30": false,
            "13:00 - 14:30": false,
            "15:00 - 16:30": false,
            "17:00 - 18:30": false,
            "19:00 - 20:30": false,
        }
        workingDays.push(new WorkingDay({name: name, workingPeriodMap: periodMap}));
    })
    const schedule = await Schedule.create({workingDays: workingDays});
    Trainer.findByIdAndUpdate(req.params.trainerId, {$set: {schedule: schedule}})
        .then(() => res.json("trainer schedule successfully updated"))
        .catch(err => res.status(400).send(err.message))
}

async function updateSchedule(valueToSet, requestBody) {
    const { trainerId, timePeriod } = requestBody;
    Trainer.findById(trainerId).then( trainer => {
        const workingDays = trainer.schedule.workingDays;
        const workingPeriodMaps = workingDays.map(period => period.workingPeriodMap);
        workingPeriodMaps.forEach(workingPeriodMap => {
            console.log(workingPeriodMap);
            workingPeriodMap.set(timePeriod, valueToSet)
        })
        return trainer.save()
    })
}

export const takePeriod = async (req, res) => {
    await checkAuthentication(req.headers.authorization, (user, errMessage) => {
        if(errMessage) {
            res.status(400).send(errMessage);
        } else updateSchedule(true, req.body).then(() => res.json("trainer schedule successfully updated!"));
    })
}

export const freePeriod = async (req, res) => {
    await checkAuthentication(req.headers.authorization, (user, errMessage) => {
        if(errMessage) {
            res.status(400).send(errMessage);
        } else updateSchedule(false, req.body).then(() => res.json("trainer schedule successfully updated!"));
    })
}

