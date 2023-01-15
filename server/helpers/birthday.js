const fs = require('fs')
const whatsapp = require('./whatsapp')

function evaluateBirthDays(message){
    console.log(message)
    let birthdates = JSON.parse(fs.readFileSync("./birthdates.json","utf-8"))
    birthdates.forEach(birthdate => {
        if(compareBirthDate(birthdate.dateOfBirth)){
            console.log("Sending message to congratulate " + birthdate.name)
            whatsapp.sendWhatsappMessage(birthdate)
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

module.exports = {
    evaluateBirthDays
}