const EventEmitter = require('events');
const fs = require('fs')
const request = require("request")
require('dotenv').config({path: __dirname + '/.env'})


//ENVIRONMENTAL VARIABLES
let phone_number_id = process.env.PHONE_NUMBER_ID
let access_token = process.env.ACCESS_TOKEN
let recipient_phone_number = process.env.RECIPIENT_PHONE_NUMBER
let url = `https://graph.facebook.com/v15.0/${phone_number_id}/messages`

const eventEmitter = new EventEmitter();
const express = require('express');
const app = express();

// Background worker function
const workerFunction = () => {
    setInterval(() => {
        // Emit event
        eventEmitter.emit('checkBirthdatesEvent', { message: 'It is a new day. Check if today is someones birthday.' });
    }, 60000); // 86400000 is a day
}

// Start background worker
workerFunction();

// Listen for custom event
eventEmitter.on('checkBirthdatesEvent', (data) => {
    evaluateBirthDays(data.message);
});




function evaluateBirthDays(message){
    console.log(message)
    let birthdates = JSON.parse(fs.readFileSync("./birthdates.json","utf-8"))
    birthdates.forEach(birthdate => {
        if(compareBirthDate(birthdate.dateOfBirth)){
            console.log("Sending message to congratulate " + birthdate.name)
            sendWhatsappMessage(birthdate)
        }
    })
}

function compareBirthDate(birthdate){
    //slice off the year
    if(obtainCurrentDate().slice(0,-5) === birthdate.slice(0,-5)){
        return true
    } else {
        return false
    }
}

function obtainCurrentDate(){
    //ISOString returns date in UTC-0
    //TODO: Contemplate local timezone
    let date_ob = new Date().toISOString().slice(0,-14).split("-")
    return `${date_ob[2]}/${date_ob[1]}/${date_ob[0]}`
}

function sendWhatsappMessage(birthdate){
    let data = {
        "messaging_product" : "whatsapp",
        "to" : recipient_phone_number,
        "recipient_type":"individual",
        "type":"text",
        "text":{
            "body": `Hoy es el cumpleaños de ${birthdate.name}`
        }
    }

    let headers = {
        "Authorization" : `Bearer ${access_token}`,
        "Content-Type" : "application/json"
    }

    request.post({
        headers: headers,
        url: url,
        body: JSON.stringify(data)
        }, function(error,response,body){
            console.log(body)
        })  
}

app.get('/', (req, res) => {
    res.send('Server is listening for events from the worker.');
});

app.listen(3000, () => {
    console.log('Express server started on port 3000');
});
