$(document).ready(function () {
    // Al hacer clic en un elemento de la galería
    $('.gallery-item').on('click', function () {
        // Obtener el target de la imagen clicada
        var target = $(this).data('target');

        // Expandir la imagen seleccionada
        $(this).addClass('expanded');

        // Mostrar el overlay de subproductos correspondiente
        $('#' + target).addClass('active');
    });

    // Opción para cerrar el overlay al hacer clic en el botón X
    $('.close-overlay').on('click', function () {
        // Cerrar el overlay activo
        $(this).closest('.subproductos-overlay').removeClass('active');

        // Remover la clase expanded de la galería
        $('.gallery-item.expanded').removeClass('expanded');
    });

});