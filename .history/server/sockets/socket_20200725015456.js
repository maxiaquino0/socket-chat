const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        console.log(usuario);
        if (!usuario.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es requerido'
            });
        }

        let personas = usuarios.agregarPersona(client.id, usuario.nombre);

        client.broadcast.emit('listaPersona', usuarios.getPersonas());

        callback(personas);
    });

    // escucho desde el server cuando un usuario envia un msj
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
        client.broadcast.emit('listaPersona', usuarios.getPersonas());

    });

    // Mensaje privados
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
    });
});