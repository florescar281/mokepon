const seccionUltimoMensaje = document.getElementById("mensaje_final")
const seccionReiniciar = document.getElementById("reiniciarJuego")
const seccionAtaque = document.getElementById("seleciona_ataque")
const botonMacotasJugador = document.getElementById ("EleccionMascota")
const botonReiniciar = document.getElementById("Reiniciar")

const spanMascotaJugador = document.getElementById("MascotaJugador")

const seccionMascota = document.getElementById("Elige_mascota")
const spanMascotaEnemigo = document.getElementById("MascotaEnemigo")

const spanVidajugador = document.getElementById("MisVidas")
const spanVidasEnemigo = document.getElementById("VidasEnemigo")

const seccionMensajesJugada = document.getElementById("resultado")
const MensajesDelJugador = document.getElementById("mensaje_jugador")
const MensajesDelEnemigo = document.getElementById("mensajes_enemigo")

const seccionMensajes = document.getElementById("mensajes")
const seccionMensajesFinal = document.getElementById("mensaje_final")
const contenedorMokepones = document.getElementById("contenedorMokepones")
const seleccionaAtaque = document.getElementById("seleccionaAtaque")

const mapa = document.getElementById("Mapa")
const mundoDeJuego = document.getElementById("MundoDeJuego")

let jugadorId = null
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let inputodie
let inputsnoopy 
let inputslinky
let vidaJugador = 0
let vidaEnemigo = 0
let opcionesDeMokepones
let opcionesDeAtaques
let ataquesDeMokepones
let movimientosMokeponMapa
let ataquesMokeponesEnemigo
let indexAtaqueEnemigo
let indexAtaqueJugador
let botonFuego
let botonAgua
let botonTierra
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src= "./imagenes/mapa de juego.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 30
const anchoMaximoMapa = 800

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 440 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos    

class Mokepon {
    constructor(Nombre,foto,vida, imagenMokepon, id = null) {
        this.id = id
        this.Nombre = Nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
        this.alto = 40
        this.ancho = 40
        this.imagenDeMokepon = new Image()
        this.imagenDeMokepon.src = imagenMokepon
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.velocidadX = 0
        this.velocidadY = 0
    }

    PintarMokepon() {
        lienzo.drawImage(
            this.imagenDeMokepon,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Odie = new Mokepon ("Odie","./imagenes/mokepons_mokepon_ratigueya_attack.png", 3, "./imagenes/ratigueya.png")

let Snoopy = new Mokepon ("Snoopy", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 3, "./imagenes/hipodoge.png")

let Slinky = new Mokepon ("Slinky", "./imagenes/mokepons_mokepon_capipepo_attack.png", 3, "./imagenes/capipepo.png")

const ODIE_ATAQUES = [
    {nombre: "🔥", id: "Fuego"},
    {nombre: "🔥", id: "Fuego"},
    {nombre: "🔥", id: "Fuego"},
    {nombre: "💧", id: "Agua"},
    {nombre: "🌱", id: "Tierra"}
]

Odie.ataque.push (...ODIE_ATAQUES)

const SNOOPY_ATAQUES = [
    {nombre: "💧", id: "Agua"},
    {nombre: "💧", id: "Agua"},
    {nombre: "💧", id: "Agua"},
    {nombre: "🌱", id: "Tierra"},
    {nombre: "🔥", id: "Fuego"}
]

Snoopy.ataque.push (...SNOOPY_ATAQUES)

const SLINKY_ATAQUES = [
    {nombre: "🌱", id: "Tierra"},
    {nombre: "🌱", id: "Tierra"},
    {nombre: "🌱", id: "Tierra"},
    {nombre: "🔥", id: "Fuego"},
    {nombre: "💧", id: "Agua"}
]

Slinky.ataque.push (...SLINKY_ATAQUES)

mokepones.push (Odie,Snoopy,Slinky)

function iniciarjuego () {
    seccionAtaque.style.display = "none"

    mundoDeJuego.style.display = "none"

    mokepones.forEach((Mokepon) => {
        opcionesDeMokepones = `
            <input class="inputs-mascotas" type="radio" name="mascota" id =${Mokepon.Nombre} />
            <label class="selection-mascota" for=${Mokepon.Nombre}>
            <p>${Mokepon.Nombre}</p>
                <img src=${Mokepon.foto} alt=${Mokepon.Nombre} />
            </label>
            `
    contenedorMokepones.innerHTML += opcionesDeMokepones
    })

    inputodie = document.getElementById("Odie")
    inputsnoopy = document.getElementById("Snoopy")
    inputslinky = document.getElementById("Slinky")

    botonMacotasJugador.addEventListener ("click", seleccionjugador)

    botonReiniciar.addEventListener ("click", reiniciarJugada)

    unionDelJugador()
}

function unionDelJugador () {
    fetch("http://localhost:8080/Unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionjugador () {

    if(inputodie.checked) {
        spanMascotaJugador.innerHTML = inputodie.id
        ataquesDeMokepones = inputodie.id
    } else if(inputsnoopy.checked) {
        spanMascotaJugador.innerHTML = inputsnoopy.id
        ataquesDeMokepones = inputsnoopy.id
    } else if(inputslinky.checked) {
        spanMascotaJugador.innerHTML = inputslinky.id
        ataquesDeMokepones = inputslinky.id
    } else {
        alert("selecciona tu mascota")
    }
        
    extraerAtaques(ataquesDeMokepones)
    datosEleccionJugador(ataquesDeMokepones)
    MostrarMapa()
}

function datosEleccionJugador (ataquesDeMokepones) {
    let nombre = ataquesDeMokepones.Nombre
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method : "post",
        headers : {
            "content-Tipe" : "application/json"
        },
        body : JSON.stringify ({
            mokepon : nombre
        })
    })
}

function MostrarMapa () {
    seccionMascota.style.display = "none"
    mundoDeJuego.style.display = "flex"

    movimientosMokeponMapa = extraerMokepon(ataquesDeMokepones)

    intervalo = setInterval(pintarCanvas, 50)

    console.log(movimientosMokeponMapa, ataquesDeMokepones)

    window.addEventListener("keydown", SePrecionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
    
}

function extraerAtaques (ataquesDeMokepones) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (ataquesDeMokepones === mokepones[i].Nombre) {
            ataques = mokepones[i].ataque
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        opcionesDeAtaques = `
            <button id=${ataque.id} class="boton_ataque BAtaque">
            <p>${ataque.nombre}</p>
            </button>
            `
    seleccionaAtaque.innerHTML += opcionesDeAtaques
    })

    botonFuego = document.getElementById("Fuego")
    botonAgua = document.getElementById("Agua")
    botonTierra = document.getElementById("Tierra")

    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaques () {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥") {
                boton.disabled = true
                ataqueJugador.push("Fuego")
                boton.style.background = "#BD0016"
                console.log(ataqueJugador)
            } else if (e.target.textContent === "💧") {
                boton.disabled = true 
                ataqueJugador.push("Agua")
                boton.style.background = "#BD0016"
                console.log(ataqueJugador)
            } else if (e.target.textContent === "🌱") {
                boton.disabled = true 
                ataqueJugador.push("Tierra")
                boton.style.background = "#BD0016"
                console.log(ataqueJugador)
            }
            ataqueAleatoriaEnemigo()
        })
    })
}

function seleccionenemigo (jugadorEnemigo) { 
    seccionAtaque.style.display = "flex"
    mundoDeJuego.style.display = "none"

   //let mascotaaleatoria = aleatorio (0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = jugadorEnemigo.Nombre
    
    ataquesMokeponesEnemigo = jugadorEnemigo.ataque

    secuenciaAtaques()
}

function ataqueAleatoriaEnemigo () {
    let ataquealeatorio = aleatorio (0, ataquesMokeponesEnemigo.length - 1)

    if(ataquealeatorio == 0 || ataquealeatorio == 1) {
        ataqueEnemigo.push("Fuego")
    } else if(ataquealeatorio == 2 || ataquealeatorio == 3) {
        ataqueEnemigo.push("Agua")
    } else if(ataquealeatorio == 4) {
        ataqueEnemigo.push("Tierra")
    }
        console.log(ataqueEnemigo)
        
        inicioDeCombate()
}

function inicioDeCombate () {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAtaques (Jugador, Enemigo) {
    indexAtaqueJugador = ataqueJugador[Jugador]
    indexAtaqueEnemigo = ataqueEnemigo[Enemigo]
}

function combate () {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAtaques(index, index)
            crearMensaje("Empate")
        } else if (ataqueJugador[index] === "Agua" && ataqueEnemigo[index] === "Fuego") {
            indexAtaques(index, index)
            crearMensaje("Ganaste")
            victoriasJugador ++
            spanVidajugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Fuego" && ataqueEnemigo[index] === "Tierra") {
            indexAtaques(index, index)
            crearMensaje("Ganaste")
            victoriasJugador ++
            spanVidajugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === "Tierra" && ataqueEnemigo[index] === "Agua") {
            indexAtaques(index, index)
            crearMensaje("Ganaste")
            victoriasJugador ++
            spanVidajugador.innerHTML = victoriasJugador
        } else {
            indexAtaques(index, index)
            crearMensaje("Perdiste")
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        revisarVidas()
    }
}

function revisarVidas () {

    if(victoriasEnemigo === victoriasJugador) {
        resultadoFinal("Esto fue un Empate")
    } else if(victoriasJugador > victoriasEnemigo) {
        resultadoFinal("Felicidades, ganaste el juego")
    } else if (victoriasJugador < victoriasEnemigo) {
        resultadoFinal("Lo siento, Perdiste el juego")
    }
}

function crearMensaje (resultado) {
    let NuevoAtaqueJugador = document.createElement("p")
    let NuevoAtaqueEnemigo = document.createElement("p")

    seccionMensajesJugada.innerHTML = resultado
    NuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    NuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    
    MensajesDelJugador.appendChild(NuevoAtaqueJugador)
    MensajesDelEnemigo.appendChild(NuevoAtaqueEnemigo)
}

function resultadoFinal (finJugada) {
    seccionMensajesJugada.style.display = "none"

    let Mensaje = document.createElement("p")
    Mensaje.innerHTML = finJugada
    seccionMensajesFinal.appendChild(Mensaje)
}

function reiniciarJugada () {
    location.reload()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function extraerMokepon () {
    for (let i = 0; i < mokepones.length; i++) {
        if (ataquesDeMokepones === mokepones[i].Nombre) {
        return mokepones[i]
        }
    }
}

function pintarCanvas () {
    movimientosMokeponMapa.x = movimientosMokeponMapa.x + movimientosMokeponMapa.velocidadX
    movimientosMokeponMapa.y = movimientosMokeponMapa.y + movimientosMokeponMapa.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    movimientosMokeponMapa.PintarMokepon()

    coordenadasJugador(movimientosMokeponMapa.x, movimientosMokeponMapa.y)

    //OdieEnemigo.PintarMokepon()
    //SnoopyEnemigo.PintarMokepon()
    //SlinkyEnemigo.PintarMokepon()

    if (movimientosMokeponMapa.velocidadX !== 0 || movimientosMokeponMapa.velocidadY !== 0) {
        revisarColiciones(OdieEnemigo)
        revisarColiciones(SnoopyEnemigo)
        revisarColiciones(SlinkyEnemigo)
    }
}

function coordenadasJugador (x, y) {

    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-Tipe" : "application/json"
        },

        body: JSON.stringify ({
            x,
            y
        })

    })
        .then (function (res) {
            if (res.ok) {
                res.json()
                 .then (function ({ mascotaEnemigo }) {
                        console.log (mascotaEnemigo)
                        mascotaEnemigo.forEach(function(mascotaEnemigo) {
                            let NuevoJugadorEnemigo = null
                            let NombreEnemigo = mascotaEnemigo.mokepon.Nombre || ""
                            if (NombreEnemigo === "Odie") {
                                NuevoJugadorEnemigo = new Mokepon ("Odie","./imagenes/mokepons_mokepon_ratigueya_attack.png", 3, "./imagenes/ratigueya.png")
                            } else if (NombreEnemigo === "Snoopy") {
                                NuevoJugadorEnemigo = new Mokepon ("Snoopy", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 3, "./imagenes/hipodoge.png")                                
                            } else if (NombreEnemigo === "Slinky") {
                                NuevoJugadorEnemigo = new Mokepon ("Slinky", "./imagenes/mokepons_mokepon_capipepo_attack.png", 3, "./imagenes/capipepo.png")
                            }
                            NuevoJugadorEnemigo.y = mascotaEnemigo.y
                            NuevoJugadorEnemigo.x = mascotaEnemigo.x

                            NuevoJugadorEnemigo.PintarMokepon()
                        })
                    })
                } 

                }
            )
}

function moverMokeponDerecha () {
    movimientosMokeponMapa.velocidadX = 5
}

function moverMokeponIzquierda () {
    movimientosMokeponMapa.velocidadX = - 5
}

function moverMokeponArriba () {
    movimientosMokeponMapa.velocidadY = - 5
}

function moverMokeponAbajo () {
    movimientosMokeponMapa.velocidadY = 5
}

function detenerMovimiento () {
    movimientosMokeponMapa.velocidadX = 0
    movimientosMokeponMapa.velocidadY = 0
}

function detenerMapa () {
    clearInterval(intervalo)
    movimientosMokeponMapa.velocidadX = 0
    movimientosMokeponMapa.velocidadY = 0
    console.log("hay colision")
}

function SePrecionoUnaTecla (event){
    switch (event.key) {
        case "ArrowUp":
            moverMokeponArriba()
            break
        case "ArrowDown":
            moverMokeponAbajo()
            break
        case "ArrowLeft":
            moverMokeponIzquierda()
            break
        case "ArrowRight":
            moverMokeponDerecha()
            break
        default:
            break;
    }
}

function revisarColiciones (jugadorEnemigo) {
    let arribaEnemigo = jugadorEnemigo.y
    let abajoEnemigo = jugadorEnemigo.y + jugadorEnemigo.alto
    let izquierdaEnemigo = jugadorEnemigo.x
    let derechaEnemigo = jugadorEnemigo.x + jugadorEnemigo.ancho

    let arribaMascota = movimientosMokeponMapa.y
    let abajoMascota = movimientosMokeponMapa.y + movimientosMokeponMapa.alto
    let izquierdaMascota = movimientosMokeponMapa.x
    let derechaMascota = movimientosMokeponMapa.x + movimientosMokeponMapa.ancho

    if(arribaMascota > abajoEnemigo || abajoMascota < arribaEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    }
    detenerMapa()
    seleccionenemigo(jugadorEnemigo)
}

window.addEventListener ("load", iniciarjuego)