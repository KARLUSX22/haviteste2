const twilio = require('twilio');
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Substitua pelo seu Account SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; // Substitua pelo seu Auth Token

const client = new twilio(accountSid, authToken);

const sendSMS = (to, body) => {
    return client.messages.create({
        body: body,
        from: 'YOUR_TWILIO_PHONE_NUMBER', // Substitua pelo seu número do Twilio
        to: to
    });
};

module.exports = sendSMS;