// server.js ou app.js
const express = require('express');
const bodyParser = require('body-parser');
const sendSMS = require('./sendSMS'); // Importe o módulo sendSMS

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint para enviar mensagens SMS
app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;

    sendSMS(to, message)
        .then(() => res.status(200).send('Mensagem enviada'))
        .catch(error => res.status(500).send('Falha ao enviar mensagem: ' + error.message));
});

// Endpoint para enviar confirmação ao barbeiro
app.post('/send-sms-to-barber', async (req, res) => {
    const { name, date, time } = req.body;
    const barberNumber = '86994220353'; // Número do barbeiro
    const message = `Novo agendamento:\nNome: ${name}\nData: ${date}\nHora: ${time}`;
    
    try {
        await sendSMS(barberNumber, message);
        res.status(200).send('Confirmação enviada ao barbeiro.');
    } catch (error) {
        res.status(500).send(`Erro ao enviar confirmação ao barbeiro: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});


