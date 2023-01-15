const request = require("request")

//ENVIRONMENTAL VARIABLES
let phone_number_id = process.env.PHONE_NUMBER_ID
let access_token = process.env.ACCESS_TOKEN
let recipient_phone_number = process.env.RECIPIENT_PHONE_NUMBER
let url = `https://graph.facebook.com/v15.0/${phone_number_id}/messages`


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

module.exports = {
    sendWhatsappMessage
}