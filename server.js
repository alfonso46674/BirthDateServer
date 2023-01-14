const fs = require('fs')
const schedule = require('node-schedule')
const request = require("request")
require('dotenv').config({path: __dirname + '/.env'})

let phone_number_id = process.env.PHONE_NUMBER_ID
let access_token = process.env.ACCESS_TOKEN
let recipient_phone_number = process.env.RECIPIENT_PHONE_NUMBER


let url = `https://graph.facebook.com/v15.0/${phone_number_id}/messages`




const job = schedule.scheduleJob("1 * * * * *",()=>{
    evaluateBirthDays()
})


function evaluateBirthDays(){
    let birthdates = JSON.parse(fs.readFileSync("./birthdates.json","utf-8"))
    birthdates.forEach(birthdate => {
        if(compareBirthDate(birthdate.dateOfBirth)){
            console.log("Sending message to congratulate " + birthdate.name)
            sendWhatsappMessage(birthdate)
        }
    })
}


function obtainCurrentDate(){
    //ISOString returns date in UTC-0
    //TODO: Contemplate local timezone
    let date_ob = new Date().toISOString().slice(0,-14).split("-")
    return `${date_ob[2]}/${date_ob[1]}/${date_ob[0]}`
}

function compareBirthDate(birthdate){
    //slice off the year
    if(obtainCurrentDate().slice(0,-5) === birthdate.slice(0,-5)){
        return true
    } else {
        return false
    }
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