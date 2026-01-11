CREATE TABLE socios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
); 

CREATE TABLE libros(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    genero VARCHAR(100),
    ejemplares_totales INT NOT NULL,
    ejemplares_disponibles INT NOT NULL
); 

CREATE TABLE prestamos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    socio_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NULL,
    FOREIGN KEY(socio_id) REFERENCES socios(id),
    FOREIGN KEY(libro_id) REFERENCES libros(id)
);

-- Insertar socios 
INSERT INTO socios(nombre, email, telefono)
VALUES(
    'Ana Pérez',
    'ana.perez@gmail.com',
    '600123123'
),(
    'Luis García',
    'luis.garcia@gmail.com',
    '611456456'
),(
    'María López',
    'maria.lopez@gmail.com',
    '622789789'
),(
    'Carlos Ruiz',
    'carlos.ruiz@gmail.com',
    '633987987'
);


-- Insertar libros 
INSERT INTO libros(
    titulo,
    autor,
    genero,
    ejemplares_totales,
    ejemplares_disponibles
)
VALUES(
    'Cien años de soledad',
    'Gabriel García Márquez',
    'Realismo mágico',
    5,
    3
),(
    '1984',
    'George Orwell',
    'Distopía',
    4,
    1
),(
    'El nombre del viento',
    'Patrick Rothfuss',
    'Fantasía',
    6,
    6
),(
    'Orgullo y prejuicio',
    'Jane Austen',
    'Romance',
    3,
    2
),(
    'El señor de los anillos',
    'J.R.R. Tolkien',
    'Fantasía',
    7,
    4
),(
    'La sombra del viento',
    'Carlos Ruiz Zafón',
    'Misterio',
    5,
    5
); 

-- Insertar préstamos (ejemplos variados) -- 1. Préstamos devueltos INSERT INTO prestamos (socio_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES (1, 1, '2025-12-01', '2025-12-20'), (2, 4, '2025-11-15', '2025-12-10'); 
-- 2. Préstamos NO devueltos (vigentes) 
INSERT INTO prestamos(
    socio_id,
    libro_id,
    fecha_prestamo,
    fecha_devolucion
) VALUES(3, 2, '2026-01-05', NULL),(4, 3, '2026-01-08', NULL);


-- 3. Préstamos vencidos (más de 30 días sin devolver)
INSERT INTO prestamos(
    socio_id,
    libro_id,
    fecha_prestamo,
    fecha_devolucion
) VALUES(1, 5, '2025-10-01', NULL),(2, 1, '2025-09-20', NULL);