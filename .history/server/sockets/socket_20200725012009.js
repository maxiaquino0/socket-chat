const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

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

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${personaBorrada.nombre} abandono el chat` });
    });

});