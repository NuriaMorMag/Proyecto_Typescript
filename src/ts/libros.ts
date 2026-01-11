class Libro { 
    constructor( 
        public id: number, 
        public titulo: string, 
        public autor: string, 
        public genero: string, 
        public disponible: boolean = true 
    ) {} 
} 
    
class Biblioteca { 
    libros: Libro[] = []; 
    idLibro: number = 1; 
    
    altaLibro(titulo: string, autor: string, genero: string): Libro { 
        const nuevo = new Libro(this.idLibro++, titulo, autor, genero, true); 
        this.libros.push(nuevo); 
        return nuevo; 
    } 
    
    buscarLibros(texto: string): Libro[] { 
        const t = texto.toLowerCase(); 
        return this.libros.filter( 
            l => l.titulo.toLowerCase().includes(t) || 
            l.autor.toLowerCase().includes(t) || 
            l.genero.toLowerCase().includes(t) 
        ); 
    } 
} 

// Instancia global 
const biblioteca = new Biblioteca(); 

// MANEJO DEL FORMULARIO: ALTA LIBRO
const formAlta = document.getElementById("formAltaLibro") as HTMLFormElement; 
const msgAlta = document.getElementById("msgAltaLibro") as HTMLParagraphElement; 

formAlta.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim(); 
    const autor = (document.getElementById("autor") as HTMLInputElement).value.trim(); 
    const genero = (document.getElementById("genero") as HTMLInputElement).value.trim(); 
    
    if (!titulo || !autor || !genero) { 
        msgAlta.textContent = "Rellena todos los campos."; 
        return; 
    } 
    
    const nuevo = biblioteca.altaLibro(titulo, autor, genero); 
    msgAlta.textContent = `Libro creado con ID ${nuevo.id}`; 
    
    formAlta.reset(); 
}); 

// MANEJO DEL FORMULARIO: BÚSQUEDA
const formBuscar = document.getElementById("formBuscar") as HTMLFormElement; 
const tabla = document.querySelector("#tablaLibros tbody") as HTMLTableSectionElement; 

formBuscar.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const texto = (document.getElementById("generoBuscar") as HTMLInputElement).value.trim(); 
    
    const resultados = biblioteca.buscarLibros(texto); 
    
    tabla.innerHTML = ""; // limpiar tabla 
    
    if (resultados.length === 0) { 
        tabla.innerHTML = `<tr><td colspan="4">No se encontraron libros.</td></tr>`; 
        return; 
    } 
    
    resultados.forEach(libro => { 
        const fila = document.createElement("tr");
        
        fila.innerHTML = ` 
        <td>${libro.id}</td> 
        <td>${libro.titulo}</td> 
        <td>${libro.autor}</td> 
        <td>${libro.disponible ? "Sí" : "No"}</td>
         `; 
         
         tabla.appendChild(fila); 
    }); 
});