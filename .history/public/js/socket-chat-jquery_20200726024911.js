var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre')
var sala = params.get('sala')

// Referencias de jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

// Funciones para renderizar usuarios
function renderizarUsuario(personas) {
    console.log(personas);

    var html = ''

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + sala + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html);

}


function renderizarMensajes(mensaje) {
    var html = '';
    '<li>';
    '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    '    <div class="chat-content">';
    '        <h5>James Anderson</h5>';
    '        <div class="box bg-light-info">Lorem Ipsum is simply dummy text of the printing & type setting industry.</div>';
    '    </div>';
    '    <div class="chat-time">10:56 am</div>';
    '</li>';
}

// Listeners
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        // console.log('respuesta server: ', resp);
        txtMensaje.val('').focus();
    });

});