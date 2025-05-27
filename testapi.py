import requests

# Your app credentials
tenant_id = 'cfd5467a-c1ed-46cc-b059-ffedabc70f86'
client_id = 'b4728d20-6d50-48a3-8feb-5060c1c76cd1'
client_secret = 'Uih8Q~C73FWyc2BO~6grB4SJ9ZKksGuFmA37Wb~j'

# OAuth2 token endpoint
token_url = f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"

# Get access token
token_data = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'https://graph.microsoft.com/.default'
}
token_r = requests.post(token_url, data=token_data)
access_token = token_r.json().get('access_token')
print(access_token)

# Prepare email message
email_msg = {
    "message": {
        "subject": "Test Email from Microsoft Graph API",
        "body": {
            "contentType": "Text",
            "content": "Hello! This is a test email sent using Microsoft Graph API."
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": "s-mahmoud.sheliel@zewailcity.edu.eg"
                }
            }
        ]
    }
}

# Send email endpoint
send_mail_url = "https://graph.microsoft.com/v1.0/users/info@traceedtech.com/sendMail"

headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

response = requests.post(send_mail_url, headers=headers, json=email_msg)

if response.status_code == 202:
    print("Email sent successfully!")
else:
    print(f"Error sending email: {response.status_code} - {response.text}")
