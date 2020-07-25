const { io } = require('../server');

var params = new URLSearchParams(window.location.search);

if (params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

io.on('connection', (client) => {

    client.on('entrarChat', (usuario) => {
        console.log(usuario);
    })

});