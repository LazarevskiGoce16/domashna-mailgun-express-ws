const express = require('express');
const emails = require('./handlers/emails');
require('dotenv').config();

const api = express();

api.use(express.json());

api.post('/api/v1/mailer', emails.send);

api.listen(process.env.PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service successfully started on port ${process.env.PORT}!`);
});
