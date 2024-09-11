let currentIndex = 0;  // Índice actual del carrusel
const items = document.querySelectorAll('.carousel-item2'); 
const totalItems = items.length;  

// Función que muestra la siguiente imagen en el carrusel
function showNextImage() {
    items[currentIndex].classList.remove('active'); 
    currentIndex = (currentIndex + 1) % totalItems; 
    items[currentIndex].classList.add('active'); 
    updateCarousel();  
}

// Función que actualiza la posición del carrusel visualmente
function updateCarousel() {
    const carouselInner = document.querySelector('carousel-inner2'); 
    const newTransform = -currentIndex * 100;  
    carouselInner.style.transform = `translateX(${newTransform}%)`;  
}

const panels = document.querySelectorAll('.panel');  // Selecciona todos los paneles

// Añade un evento de clic a cada panel
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();  
        panel.classList.add('active'); 
    });
});

// Función que remueve la clase 'active' de todos los paneles
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');  // Elimina la clase 'active' de cada panel
    });
}
// Cargar noticias desde un archivo JSON
function cargarNoticias() {
    $.getJSON("/data/tecnologia.json", function (data) {
        console.log(data); // Verifica si se están obteniendo los datos

        var noticiasHTML = '';
        $.each(data, function (key, noticia) {
            noticiasHTML += '<div class="noticia">';
            noticiasHTML += '<h3>' + noticia.titulo + '</h3>';
            noticiasHTML += '<p>' + noticia.descripcion + '</p>';
            noticiasHTML += '</div>';
        });

        $('#noticias-container').html(noticiasHTML);
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}

//llamamos a la funcion para que carguen las noticias desde el JSON
cargarNoticias();