class Prestamo { 
    constructor( 
        public id: number, 
        public socioId: number, 
        public libroId: number, 
        public fechaPrestamo: Date, 
        public fechaVencimiento: Date, 
        public fechaDevolucion: Date | null = null
     ) {} 
} 

class Biblioteca { 
    prestamos: Prestamo[] = []; 
    idPrestamo: number = 1;

    registrarPrestamo(socioId: number, libroId: number, dias: number): Prestamo { 
        const hoy = new Date(); 
        const vence = new Date(); 
        vence.setDate(hoy.getDate() + dias); 
        
        const nuevo = new Prestamo( 
            this.idPrestamo++, 
            socioId, 
            libroId, 
            hoy, 
            vence, 
            null 
        ); 
        
        this.prestamos.push(nuevo); 
        return nuevo; 
    } 
    
    registrarDevolucion(id: number): boolean { 
        const p = this.prestamos.find(x => x.id === id); 
        if (!p || p.fechaDevolucion) return false; 
        
        p.fechaDevolucion = new Date(); 
        return true; 
    } 
} 

const biblioteca = new Biblioteca(); 

// REGISTRAR PRÉSTAMO

const formPrestamo = document.getElementById("formPrestamo") as HTMLFormElement; 
const msgPrestamo = document.getElementById("msgPrestamo") as HTMLParagraphElement; 

formPrestamo.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const socioId = Number((document.getElementById("socioId") as HTMLInputElement).value); 
    const libroId = Number((document.getElementById("libroId") as HTMLInputElement).value); 
    const dias = Number((document.getElementById("dias") as HTMLInputElement).value); 
    
    if (!socioId || !libroId || !dias) { 
        msgPrestamo.textContent = "Completa todos los campos."; 
        return; 
    } 
    
    const nuevo = biblioteca.registrarPrestamo(socioId, libroId, dias); 
    msgPrestamo.textContent = `Préstamo creado con ID ${nuevo.id}`; 
    
    actualizarTabla(); 
    formPrestamo.reset(); 
}); 

// ACTUALIZAR TABLA DE PRÉSTAMOS

const tabla = document.querySelector("#tablaPrestamos tbody") as HTMLTableSectionElement; 

function actualizarTabla() { 
    tabla.innerHTML = ""; 
    
    if (biblioteca.prestamos.length === 0) { 
        tabla.innerHTML = `<tr><td colspan="6">No hay préstamos registrados.</td></tr>`; 
        return; 
    } 
    
    biblioteca.prestamos.forEach(p => { 
        const fila = document.createElement("tr"); 
        
        fila.innerHTML = ` 
        <td>${p.id}</td> 
        <td>${p.socioId}</td> 
        <td>${p.libroId}</td> 
        <td>${p.fechaPrestamo.toLocaleDateString()}</td> 
        <td>${p.fechaVencimiento.toLocaleDateString()}</td> 
        <td>${p.fechaDevolucion ? p.fechaDevolucion.toLocaleDateString() : "No"}</td> 
        `; 
        tabla.appendChild(fila); 
    }); 
} 

// REGISTRAR DEVOLUCIÓN


const formDevolucion = document.getElementById("formDevolucion") as HTMLFormElement; 
const msgDevolucion = document.getElementById("msgDevolucion") as HTMLParagraphElement; 

formDevolucion.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const id = Number((document.getElementById("idPrestamoDev") as HTMLInputElement).value); 
    
    if (!id) { 
        msgDevolucion.textContent = "Introduce un ID válido."; 
        return; 
    } 
    
    const ok = biblioteca.registrarDevolucion(id); 
    msgDevolucion.textContent = ok 
        ? "Devolución registrada correctamente." 
        : "No se encontró el préstamo o ya estaba devuelto."; 
        
    actualizarTabla(); 
    formDevolucion.reset(); 
});