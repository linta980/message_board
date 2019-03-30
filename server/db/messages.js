const db = require('./connection');
const JOI = require('joi')

const schema = JOI.object().keys({
    username: JOI.string().max(20).required(),
    subject: JOI.string().required(),
    message: JOI.string().max(500).required(),
    // imageURL: JOI.uri({
    //     schema: [
    //         /http?/
    //     ]
    // })
    imageURL: JOI.string().max(300).optional()

})


const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    const result = JOI.validate(message, schema);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    }
    else {
        return Promise.reject(result.error)
    }
}

module.exports = {
    getAll,
    create
}