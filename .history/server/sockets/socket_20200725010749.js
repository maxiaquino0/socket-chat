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

        callback(personas);
    });

    client.on('disconect', () => {
        usuarios.borrarPersona(client.id)
    });

});