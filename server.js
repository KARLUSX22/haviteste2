const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Configure Twilio
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Substitua com seu SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';   // Substitua com seu Token
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/send-sms', (req, res) => {
    const { to, body } = req.body;

    client.messages.create({
        body: body,
        from: '+86994220353', // Seu número Twilio
        to: to
    })
    .then(message => res.status(200).send('Mensagem enviada com sucesso!'))
    .catch(error => res.status(500).send('Erro ao enviar mensagem: ' + error.message));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
