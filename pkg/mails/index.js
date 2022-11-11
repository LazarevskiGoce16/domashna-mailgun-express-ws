const mongoose = require('mongoose');

const Email = mongoose.model(
    'email',
    {
        from: String,
        to: String,
        subject: String,
        content: String
    },
    'emails'
);

const create = async(data) => {
    let e = new Email(data);
    return e.save();
};

module.exports = {
    create
};
