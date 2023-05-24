import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const jwtSecret = "rysykevich_ekaterina_jwt"
export async function checkAuthentication(jwtToken, callback) {
    if (jwtToken) {
        try {
            const user = jwt.verify(jwtToken, jwtSecret);
            callback(await User.findById(user.id), null);
        } catch (err) {
            callback(null, err.message);
        }
    } else {
        callback(null, "not authorized");
    }
}
export async function checkAuthorization(username, password, callback) {
    if(username === "admin@gmail.com" && password === "admin") {
        callback("admin", null);
    }
    const user = await User.findOne({username: username}).lean();
    if(!user) {
        callback(null, "wrong username");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
        callback(jwt.sign({id: user._id, username: user.username}, jwtSecret), null);
    } else callback(null, "wrong password");
}
export const register = async (req, res) => {
    const userData = req.body;
    userData.password = await bcrypt.hash(req.body.password, 10);
    User.create(userData)
        .then(user => {
            const token = jwt.sign({id: user._id, password: user.password}, jwtSecret);
            res.json({token: token});
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send(err.message)
        });
}
export const login = async (req, res) => {
    const {username, password} = req.body;
    await checkAuthorization(username, password, (token, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else res.json({token: token})
    })
}
export const find = async (req, res) => {
    await checkAuthentication(req.headers.authorization, (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else res.send(user);
    })
}

export const changePassword = async (req, res) => {
    await checkAuthentication(req.headers.authorization, async (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else {
            const {oldPassword, newPassword, newPasswordRepeat} = req.body;
            if (!await bcrypt.compare(oldPassword, user.password)) {
                res.status(400).send('Старый пароль введен неправильно!');
            } else if(newPassword !== newPasswordRepeat) {
                res.status(400).send('Пароли не совпадают!');
            } else {
                await User.findByIdAndUpdate(user._id, {$set: {password: await bcrypt.hash(newPassword, 10)}})
                res.json('ok');
            }
        }
    })
}
export const findAll =  async (req, res) => {
    res.json(await User.find());
}
export const findByUsername = async (req, res) => {
    const token = req.headers.authorization;
    await checkAuthentication(token, (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else User.findOne({username: user.username})
            .then(response => res.json({user: response}))
            .catch(err => res.status(400).send(err.message))
    })
}
export const update = async (req, res) => {
    const token = req.headers.authorization;
    await checkAuthentication(token, (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else User.findByIdAndUpdate(user.id, {$set: req.body})
            .then(response => res.json({user: response}))
            .catch(err => res.status(400).send(err.message))
    })
}

export const findMembershipsWithStatus= async (req, res) => {
    const token = req.headers.authorization;
    await checkAuthentication(token, (user, errMessage) => {
        if (errMessage) {
            res.status(500).send(errMessage);
        } else User.findById(user.id).populate('memberships')
            .then(user => {
                console.log(req.params.status);
                console.log(user.memberships);
                res.json(user.memberships.filter(item => item.status === req.params.status))
            }).catch(err => res.status(400).send(err.message))
    })
}
