require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const { PORT } = process.env
const app = express();
app.use(bodyParser.json());
const eventos = []

app.post('/eventos', async (req, res) => {
    const evento = req.body;
    eventos.push(evento);
    try {
        await axios.post('http://logs-clusterip-service:2000/eventos', evento)
    }
    catch (err) { }
    try {
        await axios.post('http://lembretes-clusterip-service:4000/eventos', evento)
    }
    catch (err) { }
    try {
        await axios.post('http://observacoes-clusterip-service:5000/eventos', evento)
    }
    catch (err) {
    }
    try {
        await axios.post('http://consulta-clusterip-service:6000/eventos', evento)
    }
    catch (err) {
    }
    try {
        await axios.post('http://classificacao-clusterip-service:7000/eventos', evento)
    }
    catch (err) { }
    res.status(200).send({ msg: "ok" });
});

app.get('/eventos', (req, res) => {
    res.send(eventos)
})


app.listen(PORT, () => console.log(`Barramento. Porta ${PORT}.`))
