const express = require("express")
const cors = require("cors")
const { json } = require("express")
const app = express()
app.use(cors())
app.use(express.json())
const puerto = 8080

let Jugadores  = []

class Jugador {
    constructor (id){
        this.id = id 
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    coordenadasDelJugador(x, y){
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor (nombre) {
        this.nombre = nombre
    }
}

app.get("/Unirse", (req, res) => {
    let id = `${Math.random()}`
    let jugador = new Jugador (id)

    Jugadores.push (jugador)

    res.setHeader('Access-Control-Allow-Origin', "*")
    
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    let jugadorId = req.params.jugadorId || ""
    let mokepon = new Mokepon (nombre)
    let nombre = req.body.mokepon || ""
    let jugadorIndex = Jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorId >= 0) {
        Jugadores[jugadorIndex].asignarMokepon(mokepon)        
    }

    console.log(Jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    let jugadorId = req.params.jugadorId || ""
    let x = req.body.x || 0
    let y = req.body.y || 0
    let jugadorIndex = Jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorId >= 0) {
        Jugadores[jugadorIndex].coordenadasDelJugador(x, y)       
    }

    let mascotaEnemigo = Jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        mascotaEnemigo
    })
})

app.listen(puerto, () => {
    console.log("Funcionando Servidor")
})