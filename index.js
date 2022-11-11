const express = require('express');
const emails = require('./handlers/emails');
const db = require('./pkg/db');
require('dotenv').config();

const api = express();
db.init();

api.use(express.json());

api.post('/api/v1/mailer', emails.create, emails.validate);

api.listen(process.env.PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service successfully started on port ${process.env.PORT}!`);
});
