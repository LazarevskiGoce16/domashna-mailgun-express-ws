const formData = require('form-data');
const Mailgun = require('mailgun.js');
const email = require('../pkg/mails');
const { Validator } = require('node-input-validator');
require('dotenv').config();

const create = async (req, res) => {
    try {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: process.env.API_USERNAME,
            key: process.env.API_KEY
        });

        let message = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.html
        };

        let out = await mg.messages.create(
            process.env.API_DOMAIN,
            message    
        );
        
        console.log(out);
        
        let e = await email.create(message);
        return res.status(201).send(`Created!, ${e}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("ISE!");
    };
};

const validate = async (req, res) => {
    try {
        const v = new Validator(req.body, {
            from: 'required|email',
            to: 'require|email',
            subject: 'required|string|maxLength:50',
            html: 'required|string'
        });

        const matched = await v.check();

        if(!matched) {
            return res.status(400).send(v.errors);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

module.exports = {
    create,
    validate
};
