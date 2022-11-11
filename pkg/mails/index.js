const { Validator } = require('node-input-validator');

const validate = async (mailData) => {
    const v = new Validator(mailData, {
        from: 'required|email',
        to: 'required|email',
        subject: 'required|string',
        html: 'required|string'
    });

    let matched = await v.check();
    if(!matched) {
        return v;
    }
    return null;
};

module.exports = {
    validate
};
