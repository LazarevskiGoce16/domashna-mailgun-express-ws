const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mails = require('../pkg/mails');
require('dotenv').config();

const send = async (req, res) => {
    try {
        let valid = await mails.validate(req.body);
        if(valid) {
            return res.status(400).send("Bad request!");
        }
        const mailgun = new Mailgun(formData);
        const mg = await mailgun.client({
            username: process.env.API_USERNAME,
            key: process.env.API_KEY
        });

        let out = await mg.messages.create(process.env.API_DOMAIN, {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.html
        });

        console.log(out);
        return res.status(201).send("Created!");
    } catch (err) {
        console.log(err);
        res.status(500).send("ISE!");
    }
};

module.exports = {
    send
};
