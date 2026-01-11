var Socio = /** @class */ (function () {
    function Socio(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
    return Socio;
}());
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.socios = [];
        this.idSocio = 1;
    }
    Biblioteca.prototype.altaSocio = function (nombre, email) {
        var nuevo = new Socio(this.idSocio++, nombre, email);
        this.socios.push(nuevo);
        return nuevo;
    };
    Biblioteca.prototype.modificarSocio = function (id, nombre, email) {
        var socio = this.socios.find(function (s) { return s.id === id; });
        if (!socio)
            return false;
        socio.nombre = nombre;
        socio.email = email;
        return true;
    };
    Biblioteca.prototype.consultarSocio = function (id) {
        return this.socios.find(function (s) { return s.id === id; });
    };
    return Biblioteca;
}());
// Instancia global 
var biblioteca = new Biblioteca();
//  MANEJO DE FORMULARIOS HTML // --- FORMULARIO 1: ALTA DE SOCIO --- 
var formAlta = document.forms[0];
formAlta.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("nombre").value.trim();
    var email = document.getElementById("email").value.trim();
    var msg = document.getElementById("msgAlta");
    if (!nombre || !email) {
        msg.textContent = "Por favor, completa todos los campos.";
        return;
    }
    var nuevo = biblioteca.altaSocio(nombre, email);
    msg.textContent = "Socio creado con ID ".concat(nuevo.id);
    formAlta.reset();
});
// --- FORMULARIO 2: MODIFICAR SOCIO --- 
var formMod = document.forms[1];
formMod.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = Number(document.getElementById("idMod").value);
    var nombre = document.getElementById("nombreMod").value.trim();
    var email = document.getElementById("emailMod").value.trim();
    var msg = document.getElementById("msgMod");
    if (!id || !nombre || !email) {
        msg.textContent = "Completa todos los campos.";
        return;
    }
    var ok = biblioteca.modificarSocio(id, nombre, email);
    msg.textContent = ok ? "Socio modificado correctamente." : "Socio no encontrado.";
    formMod.reset();
});
// --- FORMULARIO 3: CONSULTAR SOCIO --- 
var formConsulta = document.forms[2];
formConsulta.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = Number(document.getElementById("idConsulta").value);
    var resultado = document.getElementById("resultadoConsulta");
    if (!id) {
        resultado.textContent = "Introduce un ID válido.";
        return;
    }
    var socio = biblioteca.consultarSocio(id);
    if (!socio) {
        resultado.textContent = "Socio no encontrado.";
    }
    else {
        resultado.innerHTML = " \n        <p><strong>ID:</strong> ".concat(socio.id, "</p> \n        <p><strong>Nombre:</strong> ").concat(socio.nombre, "</p> \n        <p><strong>Email:</strong> ").concat(socio.email, "</p> \n        ");
    }
    formConsulta.reset();
});
