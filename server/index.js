const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages')

const app = express();

//Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParse.json());


//Get route
app.get('/', (req, res) => {
    res.json({
        message: 'Full stack message board!, sta je s tobom '
    });

})

app.get('/messages', (req, res) => {
    messages.getAll().then(messages => {
        res.json(messages);
    })
})

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error)
    })
})

//POrt to listen to ..
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Listening on ${port} port...`);
})

