const express = require('express');
const EventEmitter = require('events');
const cors = require('cors')



const router = require('./router/index')
const birthdays = require('./helpers/birthday')
require('dotenv').config({path: __dirname + '/.env'})

const eventEmitter = new EventEmitter();
const app = express();

const {json} = express

//basic parse configuration
app.use(json())
app.use(cors())

// Background worker function
const workerFunction = () => {
    setInterval(() => {
        // Emit event
        eventEmitter.emit('checkBirthdatesEvent', { message: 'It is a new day. Check if today is someones birthday.' });
    }, 15000); // 86400000 is a day
}

// Start background worker
workerFunction();

// Listen for custom event
eventEmitter.on('checkBirthdatesEvent', (data) => {
    birthdays.evaluateBirthDays(data.message);
});



app.use(router)

app.listen(3000, () => {
    console.log('Express server started on port 3000');
});
