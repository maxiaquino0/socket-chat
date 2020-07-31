const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje, crearMensajePrivado } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es requerido'
            });
        }

        client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre} se unió`));

        callback(usuarios.getPersonasPorSala(usuario.sala));
    });

    // escucho desde el server cuando un usuario envia un msj
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    // Mensaje privados
    client.on('mensajePrivado', (data, callback) => {
        console.log('msjPrivado', data);
        let de = usuarios.getPersona(client.id);

        let mensaje = crearMensajePrivado(de, data.mensaje, data.para);

        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
        callback(mensaje);
    });

    // Capturar evento: 'buscarPersonas'
    client.on('buscarPersonas', (txtFiltro, callback) => {
        //llamar a funcion que filtra por sala y texto de busqueda
        resp = usuarios.filtrarPesonasPorTexto(txtFiltro.filtro, txtFiltro.sala);
        //devolver via callback el arreglo que contiene los usuarios filtrados por busqueda
        callback(resp);
    });
});