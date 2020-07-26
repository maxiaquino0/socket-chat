var params = new URLSearchParams(window.location.search);

// Funciones para renderizar usuarios
function renderizarUsuario(personas) {
    console.log(personas);

    var html = ''

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';
}