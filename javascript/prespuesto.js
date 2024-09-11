//llamado a funciones de validacion del Contacto al perder el focus en cada campo ////
document.getElementById("nombre").addEventListener("blur", validateName);
document.getElementById("apellido").addEventListener("blur", validateApellido);
document.getElementById("telefono").addEventListener("blur", validateTelefono);
document.getElementById("email").addEventListener("blur", validateCorreo);
document.addEventListener("mouseout", borrarPlazoError);

// llamado a funciones al darle click a los botones enviar formulario y  reset  ////
document.getElementById("resetBtn").addEventListener("click", resetFormulario);
document
  .getElementById("submit-btn")
  .addEventListener("click", enviarFormulario);

// funcion de borrar mensaje de error al inentar enviar formulario sin elegir todas las opciones ////
function borrarPlazoError() {
  plazoError.textContent = "";
}

// funcion enviar formulario ////

function enviarFormulario(event) {
  // verifica que este seleccionado una opcion de  plazo de entrega antes de enviar el formulario////
  const alMenosUnoSeleccionado = Array.from(checkboxes).some(
    (chk) => chk.checked
  );

  if (!alMenosUnoSeleccionado) {
    plazoError.textContent =
      "Debe seleccionar todas las opciones del formulario. Antes de enviarlo";
    event.preventDefault(); // Previene el envío del formulario y
  }
}

// funcion que resetea el formulario y coloca los valores del presupuesto en cero y los modelos y configuracion en blanco ///
function resetFormulario() {
  document.getElementById("forma1").reset();
  plazoError.textContent = "";
  total = 0;
  descuento1 = 0;
  totalPlazo = 0;

  document.getElementById("caracteristica1").innerHTML = "Configuración ";
  document.getElementById("caracteristica").innerHTML = "";
  document.getElementById("modelo1").innerHTML = "Modelo ";
  document.getElementById("modelo").innerHTML = "";

  // deshabilita los checkboox de plazo de entrega
  document
    .querySelectorAll('input[name="option"]')
    .forEach(function (checkbox) {
      checkbox.disabled = true;
    });

  //deshabilita las opciones de modelos de portatil ////
  document.getElementById("modelo").disabled = true;

  //deshabilita las opciones de configuracion  ////
  document.getElementById("caracteristica").disabled = true;
  // llama a funcion actulizar precio para colocar el presupuesto en Cero  ////
  actualizarPrecio();
  // llama a funcion clearErrors para borrar mensaje de error de intentar enviar formulario ////
  clearErrors();
}
// fin reseter formulario boton reset

/// funciones para validar contactos

function validateName() {
  const name = document.getElementById("nombre").value.trim(); // elimina espacios en blanco del nombre al pricipio y al final
  const nameError = document.getElementById("nombreError");

  if (/^[A-Za-z]{3,15}$/.test(name)) {
    nameError.textContent = "";
    return true;
  } else {
    nameError.textContent =
      "El nombre debe contener solo letras, tener un máximo de 15 caracteres y minimo 3 caracteres.";
    return false;
  }
}

function validateApellido() {
  const apellido = document.getElementById("apellido").value.trim(); // elimina espacios en blanco del apellido al pricipio y al final
  const apellidoError = document.getElementById("apellidoError");
  //  valida solo Letras y espacio vacio enter apellidos y que cada apellido empiece en Mayuscula,  ////
  // y menor de 40 caracteres y mayor a 2 caracteres////
  if (
    /(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/.test(
      apellido
    ) &&
    apellido.length <= 40
  ) {
    apellidoError.textContent = ""; // borra mensaje de error  ////
    return true;
  } else {
    apellidoError.textContent =
      "Los apellidos debe contener solo letras, comenzar con Mayúscula,  no debe exceder los 40 caracteres y un mínimo de 3 caracteres.";
    return false;
  }
}
//funcion que valida el numero de telefono donde no debe tener mas de 9 numeros y sin letras
function validateTelefono() {
  const telefono = document.getElementById("telefono").value;
  const telefonoError = document.getElementById("telefonoError");
  if (/^\d+$/.test(telefono) && telefono.length <= 9) {
    telefonoError.textContent = "";
    return true;
  } else {
    telefonoError.textContent = "El teléfono debe contener solo números.";
    return false;
  }
}

//funcion que valida el correo electronico para que este bien escrito
function validateCorreo() {
  const correo = document.getElementById("email").value;
  const correoError = document.getElementById("emailError");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    correoError.textContent = "";
    return true;
  } else {
    correoError.textContent = "El correo electrónico no es válido.";
    return false;
  }
}

/// funciones para validar contactos

//funcion que permite eliminar los errores
function clearErrors() {
  document.getElementById("nombreError").textContent = "";
  document.getElementById("apellidoError").textContent = "";
  document.getElementById("telefonoError").textContent = "";
  document.getElementById("correoError").textContent = "";
  document.getElementById("plazoError").textContent = "";
}

// fin  funciones para validar contactos

// inicio  PRESUPUESTO
//  variables globales para presupuesto
var precioCaracteristica = 0;
var total = 0;
var contador = 1;
var totalPlazo = 0;
var descuento1 = 0;
var producto1 = "";

//  deshabilita los checkbox de plazo de entrega

document
  .querySelectorAll('input[name="checkbox%"]')
  .forEach(function (checkbox) {
    checkbox.disabled = true;
  });

producto.addEventListener("change", seleccionProducto);

function resetProducto() {
  total = 0;
  totalPlazo = 0;
  descuento1 = 0;
  modelo.value = 0;
  precioCaracteristica = 0;

  document.getElementById("caracteristica1").innerHTML = "Configuración ";

  //deshabilita los checkbox de plazo de entrega////
  document
    .querySelectorAll('input[name="checkbox%"]')
    .forEach(function (checkbox) {
      checkbox.disabled = true;
    });
  checkboxes.forEach((cb) => {
    cb.checked = false;
  });

  //deshabilita las opciones de modelos de portatil////
  document.getElementById("modelo").disabled = true;
  // selectCaracteristica.innerHTML = "";

  //deshabilita las opciones de configuracion de productos////
  document.getElementById("caracteristica").disabled = true;

  actualizarPrecio();
}

const precioTotal = document.getElementById("precio-total");
function seleccionProducto() {
  resetProducto();
  producto1 = document.getElementById("producto").value;

  document.getElementById("modelo").disabled = false; //habilita modelo////
  document.getElementById("modelo1").innerHTML = "Modelo " + producto1;
  var selectModelo = document.getElementById("modelo");

  // Eliminar las opciones de modelos de portatil existentes////
  selectModelo.innerHTML = "";
  // Definir nuevas opciones
  if (producto1 == "Portatil") {
    var nuevosModelos = [
      {
        value: "",
        disabled: "true",
        selected: "true",
        text: "Selecciones un Modelo",
      },
      { value: "500", id: "Acer", text: "Portatil Acer  500€" },
      { value: "600", id: "HP", text: "Portatil HP  600€" },
      { value: "700", id: "Dell", text: "Portatil Dell 700€" },
    ]; //selected
  } else {
    if (producto1 == "Ordenador") {
      var nuevosModelos = [
        {
          value: "",
          disabled: "true",
          selected: "true",
          text: "Selecciones un Modelo",
        },
        { value: "500", id: "Acer", text: "Ordenador Acer  500€" },
        { value: "600", id: "HP", text: "Ordenador HP  600€" },
        { value: "700", id: "Dell", text: "Ordenador Dell 700€" },
      ];
    } else {
      var nuevosModelos = [
        {
          value: "",
          disabled: "true",
          selected: "true",
          text: "Selecciones un Modelo",
        },
        { value: "800", id: "Samsung", text: "Samsung Galaxy Tab S9  800€" },
        { value: "400", id: "Lenovo", text: "Lenovo Tab P12  400€" },
        { value: "300", id: "Huawei", text: "Huawei Matepad 11 300€" },
      ];
    }
  }
  //habilita las opciones de configuracion de productos////
  document.getElementById("caracteristica").disabled = true;
  document.getElementById("caracteristica").innerHTML = "";

  nuevosModelos.forEach(function (opcion) {
    var nuevosModelo = document.createElement("option");
    nuevosModelo.value = opcion.value;
    nuevosModelo.text = opcion.text;
    nuevosModelo.disabled = opcion.disabled;
    nuevosModelo.selected = opcion.selected;

    selectModelo.add(nuevosModelo);
  });
}
modelo.addEventListener("change", seleccionModelo);

function seleccionModelo() {
  const modelo = document.getElementById("modelo");
  const seleIndex = modelo.selectedIndex;
  const seletTexto = modelo.options[seleIndex].text;

  //habilita las opciones de configuracion de productos ////
  document.getElementById("caracteristica").disabled = false;
  //  habilita los checkbox de plazo de entrega////
  document
    .querySelectorAll('input[name="checkbox%"]')
    .forEach(function (checkbox) {
      checkbox.disabled = false;
    });

  document.getElementById("caracteristica1").innerHTML =
    "Configuración " + seletTexto;

  var selectCaracteristica = document.getElementById("caracteristica");

  // Eliminar las configurciones existentes

  selectCaracteristica.innerHTML = "";

  // Definir nuevas opciones

  if (producto1 == "Tablet") {
    var nuevasOpciones = [
      {
        value: "",
        disabled: "true",
        selected: "true",
        text: "Selecciona una Configuración",
      },
      { value: "20", text: "Memoria interna  8GB 20€" },
      { value: "40", text: "Memoria interna  64GB 40€" },
      { value: "80", text: "Memoria interna  128GB 80€" },
      { value: "100", text: "Memoria interna  256GB 100€" },
    ];
  } else {
    var nuevasOpciones = [
      {
        value: "",
        disabled: "true",
        selected: "true",
        text: "Selecciona una Configuración",
      },
      { value: "40", text: "Memoria 8GB y Disco DD 250GB  40€" },
      { value: "60", text: "Memoria 16GB y Disco DD 250GB  60€" },
      { value: "80", text: "Memoria 16GB y Disco DD 500GB  80€" },
      { value: "150", text: "Memoria 32GB y Disco DD 1Tera  150€" },
    ];
  }

  // Agregar nuevas opciones al select

  nuevasOpciones.forEach(function (opcion) {
    var nuevaOpcion = document.createElement("option");
    nuevaOpcion.value = opcion.value;
    nuevaOpcion.text = opcion.text;
    nuevaOpcion.disabled = opcion.disabled;
    nuevaOpcion.selected = opcion.selected;

    selectCaracteristica.add(nuevaOpcion);
  });
}

modelo.addEventListener("change", actualizarPrecio);
caracteristica.addEventListener("change", actualizarPrecio);

// checkbox de plazo entrega
const checkboxes = document.querySelectorAll('input[name="checkbox%"]');
let lastChecked;
const selectedOption = document.getElementsByName("option");

const totalDisplay = document.getElementById("total");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    // Desmarcar todos los checkboxes excepto el que se ha seleccionado

    checkboxes.forEach((cb) => {
      if (cb !== checkbox) cb.checked = false;
    });

    // solo permite seleccionar uno a la vez y no deja desseleccionar

    if (lastChecked && lastChecked !== this && lastChecked.checked) {
      lastChecked.checked = false;
    }
    if (this.checked) {
      lastChecked = this;
    } else {
      this.checked = true; // Impide deseleccionar sin seleccionar otro
    }
    // fin solo permite seleccionr uno a la vez y no deja desseleccionar

    //Mostrar la opción seleccionada y sumar al total
    if (checkbox.checked) {
      totalPlazo = checkbox.value;

      actualizarPrecio();
    } else {
      selectedOption.textContent = "Ninguna";
      totalDisplay.textContent = "0";
    }
  });
});

// fin checkboxes

function actualizarPrecio() {
  // inicializa a cero posibleas valores del presupuesto
  var precioModelo = parseInt(modelo.value);

  if (isNaN(parseInt(caracteristica.value))) {
    precioCaracteristica = 0;
  } else {
    precioCaracteristica = parseInt(caracteristica.value);
  };

  if (isNaN(parseInt(precioModelo))) {
    precioModelo = 0;
  };
  if (precioModelo == 0) {  // al seleccionar otro producto resetea el valos de precioCaracteristica.. porque precioModelo es 0
        precioCaracteristica=0;
  };

  descuento1 =
    (parseInt(totalPlazo) * (precioModelo + precioCaracteristica)) / 100;
  total = precioModelo + precioCaracteristica - descuento1;
  precioTotal.textContent = total;

  descuento.textContent = descuento1;
}