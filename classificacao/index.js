require('dotenv').config()
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const { PORT } = process.env
const palavraChave = "importante";
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave)
                ? "importante"
                : "comum";
        axios.post("http://barramento-de-eventos:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    },
};
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) { }
    res.status(200).send({ msg: "ok" });
});

app.listen(PORT, async () => {
    console.log(`Classificação. Porta: ${PORT}.`)
    const resp = await axios.get('http://barramento-de-eventos:10000/eventos')
    resp.data.forEach((valor, indice, colecao) => {
      try {
        funcoes[valor.type](valor.payload)
      }
      catch (err) { }
    })
  })

