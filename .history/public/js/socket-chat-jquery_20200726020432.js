var params = new URLSearchParams(window.location.search);

// Funciones para renderizar usuarios
function renderizarUsuario(personas) {
    console.log(personas);

    var html = ''

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '    <a href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>Varun Dhavan <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

}