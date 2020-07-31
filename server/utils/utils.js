const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

const crearMensajePrivado = (de, mensaje, sala) => {
    return {
        de: { id: de.id, nombre: de.nombre },
        mensaje,
        fecha: new Date().getTime()
    }
}

module.exports = {
    crearMensaje,
    crearMensajePrivado
}