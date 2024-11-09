const express = require("express")
const app = express()
app.use(express.json())
const axios = require('axios')

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

app.listen(8000, async () => {
    console.log("Logs, Porta 8000")
})