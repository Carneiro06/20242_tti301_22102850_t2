require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())
const axios = require('axios')

const { PORT } = process.env
const baseLogs = {}
id = 0;

app.get("/logs", (req, res) => {
    res.send(baseLogs)
})


app.post("/eventos", (req, res) => {
    try {
        const teste = req.body
        console.log(teste)
        baseConsulta[++id] = { "evento": req.body.tipo, "data": new Date().toISOString() }
        
    }
    catch (err) { }
    res.status(200).send({ msg: "ok" })
})

app.listen(PORT, async () => {
    console.log(`Logs. ${PORT}`)
    const resp = await axios.get('http://barramento-de-eventos-service:10000/eventos')
    resp.data.forEach((valor, indice, colecao) => {
      try{
        baseConsulta[++id] = {"tipo_evento": valor.type, "data_hora": new Date().toISOString()}
      }
      catch(err){}
    })
  })