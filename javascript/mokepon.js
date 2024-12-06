function iniciarjuego() {
    let botonMacotasJugador = document.getElementById ("EleccionMascota")
    botonMacotasJugador.addEventListener ("click", seleccionjugador)

    let resultado = ""
    
        if(botonMacotasJugador == document.getElementById("Odie")) {
            resultado = "Elegiste a Odie"
        } else if(botonMacotasJugador == document.getElementById("Snoopy")) {
            resultado = "Elegiste a Snoopy"
        } else if(botonMacotasJugador == document.getElementById("Slinky")) {
            resultado = "Elegiste a Slinky"
        }
        return resultado

}

function seleccionjugador() {
    alert("seleccionaste tu mascota")
}

window.addEventListener ("load", iniciarjuego)

