import {Schedule} from "../models/Schedule.js";
import {Trainer} from "../models/Trainer.js";
import {WorkingDay} from "../models/WorkingDay.js";

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