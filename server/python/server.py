import json
import requests


phone_number_id = ""
access_token = ""
recipient_phone_number = "" 

url = f"https://graph.facebook.com/v15.0/{phone_number_id}/messages"
headers = {
    "Authorization" : f"Bearer {access_token}",
    "Content-Type" : "application/json"
}


birthday_person = "Test"

msg_body_params = [
    {
        "type" : "text",
        "text" : "01/01/1999"
    },
    {
        "type" : "text",
        "text" : birthday_person
    }
]

data = {
    "messaging_product" : "whatsapp",
    "to" : recipient_phone_number,
    "recipient_type":"individual",
    "type":"text",
    "text":{
        "body": "TESTINGGGG"
    }
}

# msg_body_params = [
#     {
#         "type" : "text",
#         "text" : "01/01/1999"
#     },
#     {
#         "type" : "text",
#         "text" : birthday_person
#     }
# ]

# data = {
#     "messaging_product" : "whatsapp",
#     "to" : recipient_phone_number,
#     "type":"template",
#     "template": {
#         "name": "hello_world",
#         "language":{
#             "code":"en_US"
#         }
#     }
# }

response = requests.post(
    url,
    headers=headers,
    data=json.dumps(data)
)

print(response.ok)