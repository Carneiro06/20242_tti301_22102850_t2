require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
lembretes = {};
id = 0;

app.get('/lembretes', (req, res) => {
    res.send(lembretes)
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});


app.post('/lembretes', async (req, res) => {
    id++
    const { texto } = req.body;
    lembretes[id] = {
        id, texto
    };
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            id,
            texto,
        },
    });
    res.status(201).send(lembretes[id]);

});

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});
