var Prestamo = /** @class */ (function () {
    function Prestamo(id, socioId, libroId, fechaPrestamo, fechaVencimiento, fechaDevolucion) {
        if (fechaDevolucion === void 0) { fechaDevolucion = null; }
        this.id = id;
        this.socioId = socioId;
        this.libroId = libroId;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaDevolucion = fechaDevolucion;
    }
    return Prestamo;
}());
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.prestamos = [];
        this.idPrestamo = 1;
    }
    Biblioteca.prototype.registrarPrestamo = function (socioId, libroId, dias) {
        var hoy = new Date();
        var vence = new Date();
        vence.setDate(hoy.getDate() + dias);
        var nuevo = new Prestamo(this.idPrestamo++, socioId, libroId, hoy, vence, null);
        this.prestamos.push(nuevo);
        return nuevo;
    };
    Biblioteca.prototype.registrarDevolucion = function (id) {
        var p = this.prestamos.find(function (x) { return x.id === id; });
        if (!p || p.fechaDevolucion)
            return false;
        p.fechaDevolucion = new Date();
        return true;
    };
    return Biblioteca;
}());
var biblioteca = new Biblioteca();
// REGISTRAR PRÉSTAMO
var formPrestamo = document.getElementById("formPrestamo");
var msgPrestamo = document.getElementById("msgPrestamo");
formPrestamo.addEventListener("submit", function (e) {
    e.preventDefault();
    var socioId = Number(document.getElementById("socioId").value);
    var libroId = Number(document.getElementById("libroId").value);
    var dias = Number(document.getElementById("dias").value);
    if (!socioId || !libroId || !dias) {
        msgPrestamo.textContent = "Completa todos los campos.";
        return;
    }
    var nuevo = biblioteca.registrarPrestamo(socioId, libroId, dias);
    msgPrestamo.textContent = "Pr\u00E9stamo creado con ID ".concat(nuevo.id);
    actualizarTabla();
    formPrestamo.reset();
});
// ACTUALIZAR TABLA DE PRÉSTAMOS
var tabla = document.querySelector("#tablaPrestamos tbody");
function actualizarTabla() {
    tabla.innerHTML = "";
    if (biblioteca.prestamos.length === 0) {
        tabla.innerHTML = "<tr><td colspan=\"6\">No hay pr\u00E9stamos registrados.</td></tr>";
        return;
    }
    biblioteca.prestamos.forEach(function (p) {
        var fila = document.createElement("tr");
        fila.innerHTML = " \n        <td>".concat(p.id, "</td> \n        <td>").concat(p.socioId, "</td> \n        <td>").concat(p.libroId, "</td> \n        <td>").concat(p.fechaPrestamo.toLocaleDateString(), "</td> \n        <td>").concat(p.fechaVencimiento.toLocaleDateString(), "</td> \n        <td>").concat(p.fechaDevolucion ? p.fechaDevolucion.toLocaleDateString() : "No", "</td> \n        ");
        tabla.appendChild(fila);
    });
}
// REGISTRAR DEVOLUCIÓN
var formDevolucion = document.getElementById("formDevolucion");
var msgDevolucion = document.getElementById("msgDevolucion");
formDevolucion.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = Number(document.getElementById("idPrestamoDev").value);
    if (!id) {
        msgDevolucion.textContent = "Introduce un ID válido.";
        return;
    }
    var ok = biblioteca.registrarDevolucion(id);
    msgDevolucion.textContent = ok
        ? "Devolución registrada correctamente."
        : "No se encontró el préstamo o ya estaba devuelto.";
    actualizarTabla();
    formDevolucion.reset();
});
