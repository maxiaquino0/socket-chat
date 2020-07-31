var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');
var usuarios = [];

// Referencias de jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var divSalaHeader = $('#divSalaHeader');
var formBuscarContacto = $('#formBuscarContacto');
var txtBuscarContacto = $('#txtBuscarContacto');

var divPrivateChatsRegion = $('#divPrivateChatsRegion');
var formEnviarPrivateChat = $('#formEnviarPrivateChat');
var idSalaPara = $('#idPara');
var txtMsjPrivado = $('#txtMsjPrivado');

// Funcion para renderizar el nombre de la Sala
function renderizarSala() {
    var html = '';
    html += '<div class="p-20 bb">';
    html += '   <h3 class="box-title">Sala de chat <small >' + params.get('sala') + '</small></h3>';
    html += '</div>';

    divSalaHeader.html(html);
}

// Funciones para renderizar usuarios
function renderizarUsuario(personas) {
    console.log('personas', personas);
    usuarios = personas;
    var html = ''

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        if (personas[i].nombre !== nombre) {
            html += '<li>';
            html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
            html += '</li>';
        }

    }

    divUsuarios.html(html);

}

// Funcion para renderizar mensajes
function renderizarMensaje(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}
// Funcion para abrir pop up si no esta abierto
function abrirMensajePrivado(mensaje) {
    console.log('abrirMensajePrivado', mensaje);
    if ($('#qnimate').hasClass('popup-box-on')) {
        console.log('esta abierto');
        renderizarMensajePrivado(mensaje, false);
    } else {
        console.log('no esta abierto, lo abrimos');
        $('#userToName').html(mensaje.de.nombre);
        idSalaPara.val(mensaje.de.id);


        $('#qnimate').addClass('popup-box-on');

        renderizarMensajePrivado(mensaje, false);

    }
}
// renderizar mensajes privados
function renderizarMensajePrivado(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    console.log('renderizarMensajePrivado', mensaje);

    if (yo) {
        html += '        <li class="reverse">';
        html += '            <div class="chat-content">';
        html += '                <h5>' + mensaje.de.nombre + '</h5>';
        html += '                <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '            </div>';
        html += '            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '            <div class="chat-time">' + hora + '</div>';
        html += '        </li>';
    } else {
        html += '        <li>';
        html += '            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '            <div class="chat-content">';
        html += '                <h5>' + mensaje.de.nombre + '</h5>';
        html += '                <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
        html += '            </div>';
        html += '            <div class="chat-time">' + hora + '</div>';
        html += '        </li>';
    }

    $('#divPrivateChatbox').append(html);
}
// funcion para el scroll automatico
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        var userPara = usuarios.find(u => u.id === id)
            // window.location = 'chat-privado.html?nombre=' + nombre + '&sala=' + id;

        $('#userToName').html(userPara.nombre);
        idSalaPara.val(id);


        $('#qnimate').addClass('popup-box-on');

    }
});

formEnviarPrivateChat.on('submit', function(e) {
    e.preventDefault();
    if (txtMsjPrivado.val().trim().length === 0) {
        return;
    }
    var para = idSalaPara.val();
    var mensaje = txtMsjPrivado.val();

    console.log('mensaje completo', { para, mensaje });
    socket.emit('mensajePrivado', { para, mensaje }, function(mensaje) {
        txtMsjPrivado.val('').focus();
        renderizarMensajePrivado(mensaje, true);
    });
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
        txtMensaje.val('').focus();
        renderizarMensaje(mensaje, true);
        scrollBottom();
    });

});

formBuscarContacto.on('keyup', function(e) {
    // e.preventDefault();
    let txtFiltro = txtBuscarContacto.val();
    socket.emit('buscarPersonas', {
        filtro: txtFiltro,
        sala: sala
    }, function(resp) {
        //mostrar resultado de la busqueda en consola del navegador
        //renderizar usuarios que coinciden con la busqueda
        renderizarUsuario(resp);
    });
});

// Funciones al iniciar
renderizarSala();

$(function() {
    $("#addClass").click(function() {
        $('#qnimate').addClass('popup-box-on');
    });

    $("#removeClass").click(function() {
        $('#qnimate').removeClass('popup-box-on');
    });
})