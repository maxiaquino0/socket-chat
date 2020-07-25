const { io } = require('../server');

var params = new URLSearchParams(window.location.search);

io.on('connection', (client) => {

    client.on('entrarChat', (usuario) => {
        console.log(usuario);
    })

});