class Socio { 
    constructor( 
        public id: number, 
        public nombre: string, 
        public email: string 
    ) {} 
} 

class Biblioteca { 
    socios: Socio[] = []; 
    idSocio: number = 1; 
    
    altaSocio(nombre: string, email: string): Socio { 
        const nuevo = new Socio(this.idSocio++, nombre, email); 
        this.socios.push(nuevo); 
        return nuevo; 
    } 
    
    modificarSocio(id: number, nombre: string, email: string): boolean { 
        const socio = this.socios.find(s => s.id === id); 
        if (!socio) return false; 
        
        socio.nombre = nombre; 
        socio.email = email; 
        return true; 
    } 
        
        consultarSocio(id: number): Socio | undefined {
             return this.socios.find(s => s.id === id); 
        } 
} 

// Instancia global 
const biblioteca = new Biblioteca();

//  MANEJO DE FORMULARIOS HTML // --- FORMULARIO 1: ALTA DE SOCIO --- 

const formAlta = document.forms[0];

formAlta.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim(); 
    const email = (document.getElementById("email") as HTMLInputElement).value.trim(); 
    const msg = document.getElementById("msgAlta") as HTMLParagraphElement; 
    
    if (!nombre || !email) { 
        msg.textContent = "Por favor, completa todos los campos."; 
        return; 
    } 
    
    const nuevo = biblioteca.altaSocio(nombre, email); 
    msg.textContent = `Socio creado con ID ${nuevo.id}`; 
    
    formAlta.reset(); 
}); 
    
// --- FORMULARIO 2: MODIFICAR SOCIO --- 
 
const formMod = document.forms[1]; 

formMod.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const id = Number((document.getElementById("idMod") as HTMLInputElement).value); 
    const nombre = (document.getElementById("nombreMod") as HTMLInputElement).value.trim(); 
    const email = (document.getElementById("emailMod") as HTMLInputElement).value.trim(); 
    const msg = document.getElementById("msgMod") as HTMLParagraphElement; 
    
    if (!id || !nombre || !email) { 
        msg.textContent = "Completa todos los campos."; 
        return; 
    } 
    
    const ok = biblioteca.modificarSocio(id, nombre, email); 
    msg.textContent = ok ? "Socio modificado correctamente." : "Socio no encontrado."; 
    
    formMod.reset(); 
}); 

// --- FORMULARIO 3: CONSULTAR SOCIO --- 

const formConsulta = document.forms[2]; 
formConsulta.addEventListener("submit", e => { 
    e.preventDefault(); 
    
    const id = Number((document.getElementById("idConsulta") as HTMLInputElement).value); 
    const resultado = document.getElementById("resultadoConsulta") as HTMLDivElement; 
    
    if (!id) { 
        resultado.textContent = "Introduce un ID válido."; 
        return; 
    } 
    
    const socio = biblioteca.consultarSocio(id); 
    
    if (!socio) { 
        resultado.textContent = "Socio no encontrado."; 
    } else { 
        resultado.innerHTML = ` 
        <p><strong>ID:</strong> ${socio.id}</p> 
        <p><strong>Nombre:</strong> ${socio.nombre}</p> 
        <p><strong>Email:</strong> ${socio.email}</p> 
        `; 
    } 
    
    formConsulta.reset(); 
});