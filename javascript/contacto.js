let map;
let directionsService;
let directionsRenderer;
const negocioUbicacion = { lat: 39.988463, lng: -0.034604 }; // Coordenadas de tu negocio



// Llama esta función cuando se carga el mapa
function initMap() {
    const negocioUbicacion = { lat: 39.988463, lng: -0.034604 };
    const map = new google.maps.Map(document.getElementById('map'), {
        center: negocioUbicacion,
        zoom: 14,
    });

    new google.maps.Marker({
        position: negocioUbicacion,
        map: map,
        title: "Mi Empresa",
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}
initMap();
//Calcula la ruta desde la direccion seleccionada por el cliente hasta el punto de llegada
function calcularRuta() {
    const direccionCliente = document.getElementById("direccion").value;

    if (direccionCliente) {
        const request = {
            origin: direccionCliente,
            destination: negocioUbicacion,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            console.log('Estado de la solicitud: ', status); // Ver el estado de la solicitud
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error('Error calculando la ruta: ', status); // Agrega error en la consola
                alert("No se pudo calcular la ruta. Verifica la dirección e intenta nuevamente.");
            }
        });
    } else {
        alert("Por favor, introduce una dirección.");
    }
}
