var Libro = /** @class */ (function () {
    function Libro(id, titulo, autor, genero, disponible) {
        if (disponible === void 0) { disponible = true; }
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.disponible = disponible;
    }
    return Libro;
}());
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.libros = [];
        this.idLibro = 1;
    }
    Biblioteca.prototype.altaLibro = function (titulo, autor, genero) {
        var nuevo = new Libro(this.idLibro++, titulo, autor, genero, true);
        this.libros.push(nuevo);
        return nuevo;
    };
    Biblioteca.prototype.buscarLibros = function (texto) {
        var t = texto.toLowerCase();
        return this.libros.filter(function (l) { return l.titulo.toLowerCase().includes(t) ||
            l.autor.toLowerCase().includes(t) ||
            l.genero.toLowerCase().includes(t); });
    };
    return Biblioteca;
}());
// Instancia global 
var biblioteca = new Biblioteca();
// MANEJO DEL FORMULARIO: ALTA LIBRO
var formAlta = document.getElementById("formAltaLibro");
var msgAlta = document.getElementById("msgAltaLibro");
formAlta.addEventListener("submit", function (e) {
    e.preventDefault();
    var titulo = document.getElementById("titulo").value.trim();
    var autor = document.getElementById("autor").value.trim();
    var genero = document.getElementById("genero").value.trim();
    if (!titulo || !autor || !genero) {
        msgAlta.textContent = "Rellena todos los campos.";
        return;
    }
    var nuevo = biblioteca.altaLibro(titulo, autor, genero);
    msgAlta.textContent = "Libro creado con ID ".concat(nuevo.id);
    formAlta.reset();
});
// MANEJO DEL FORMULARIO: BÚSQUEDA
var formBuscar = document.getElementById("formBuscar");
var tabla = document.querySelector("#tablaLibros tbody");
formBuscar.addEventListener("submit", function (e) {
    e.preventDefault();
    var texto = document.getElementById("generoBuscar").value.trim();
    var resultados = biblioteca.buscarLibros(texto);
    tabla.innerHTML = ""; // limpiar tabla 
    if (resultados.length === 0) {
        tabla.innerHTML = "<tr><td colspan=\"4\">No se encontraron libros.</td></tr>";
        return;
    }
    resultados.forEach(function (libro) {
        var fila = document.createElement("tr");
        fila.innerHTML = " \n        <td>".concat(libro.id, "</td> \n        <td>").concat(libro.titulo, "</td> \n        <td>").concat(libro.autor, "</td> \n        <td>").concat(libro.disponible ? "Sí" : "No", "</td>\n         ");
        tabla.appendChild(fila);
    });
});
