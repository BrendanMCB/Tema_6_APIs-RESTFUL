// books.js
const express = require("express");
const router = express.Router(); // Initialize the Express router

/**
 * @swagger
 * components:
 * schemas:
 * Libro:
 * type: object
 * required:
 * - titulo
 * - autor
 * - editorial
 * - id
 * properties:
 * titulo:
 * type: string
 * description: Título del libro
 * autor:
 * type: string
 * description: Autor del libro
 * editorial:
 * type: string
 * description: Editorial del libro
 * id:
 * type: string
 * description: ISBN del libro (identificador único)
 * example:
 * titulo: "Cien años de soledad"
 * autor: "Gabriel García Márquez"
 * editorial: "Sudamericana"
 * id: "ISBN978-8497592053"
 */

/**
 * @swagger
 * tags:
 * name: Libros
 * description: API para gestionar libros
 */

const libros = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        editorial: "Sudamericana",
        id: "ISBN978-8497592053"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        editorial: "Secker & Warburg",
        id: "ISBN978-0451524935"
    },
    {
        titulo: "El Señor de los Anillos",
        autor: "J.R.R. Tolkien",
        editorial: "Allen & Unwin",
        id: "ISBN978-0618260274"
    },
    {
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        editorial: "Francisco de Robles",
        id: "ISBN978-8424914779"
    }
];

/**
 * @swagger
 * /libros/search:  <-- Updated path
 * get:
 * summary: Busca libros por título.
 * tags: [Libros]
 * parameters:
 * - in: query
 * name: titulo
 * schema:
 * type: string
 * required: true
 * description: Título del libro a buscar
 * responses:
 * 200:
 * description: Libros encontrados.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libros encontrados
 * libros:
 * type: array
 * items:
 * $ref: '#/components/schemas/Libro'
 * 400:
 * description: Título de query requerido.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Query de titulo requerida
 */
router.get('/search', (req, res) => { // Route path is relative to the router's mount point
    if (!req.query.titulo) {
        return res.status(400).json({
            message: 'Query de titulo requerida',
        });
    }
    const selectLibros = libros.filter(elem => elem.titulo === req.query.titulo);
    console.log(selectLibros);
    res.status(200).json({
        message: 'Libros encontrados',
        libros: selectLibros
    });
});

/**
 * @swagger
 * /libros:  <-- Updated path (this is the root of the /libros mount point)
 * post:
 * summary: Agrega un nuevo libro.
 * tags: [Libros]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Libro'
 * responses:
 * 200:
 * description: Libro agregado correctamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libro agregado correctamente
 * libro:
 * $ref: '#/components/schemas/Libro'
 * 400:
 * description: Datos de libro requeridos.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Data de libro requerida
 */
router.post("/", (req, res) => { // Route path is relative to the router's mount point
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: 'Data de libro requerida',
        });
    }
    libros.push(req.body);
    res.status(200).json({
        message: 'Libro agregado correctamente',
        libro: libros[libros.length - 1]
    });
});

/**
 * @swagger
 * /libros/{id}:  <-- Updated path
 * put:
 * summary: Actualiza un libro existente por su ID.
 * tags: [Libros]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID (ISBN) del libro a actualizar
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Libro'
 * responses:
 * 200:
 * description: Libro actualizado correctamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libro actualizado correctamente
 * libro:
 * $ref: '#/components/schemas/Libro'
 * 400:
 * description: Datos de libro o ID requeridos.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Data de libro o ID requerido
 * 404:
 * description: Libro no encontrado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libro no encontrado
 */
router.put("/:id", (req, res) => { // Route path is relative to the router's mount point
    if (!req.body || Object.keys(req.body).length === 0 || !req.params.id) {
        return res.status(400).json({
            message: 'Data de libro o ID requerido',
        });
    }
    const libroIndex = libros.findIndex(elem => {
        return elem.id === req.params.id;
    });
    if (libroIndex < 0) {
        return res.status(404).json({
            message: 'Libro no encontrado',
        });
    }
    for (const property in req.body) {
        console.log(property);
        libros[libroIndex][property] = req.body[property];
    }
    res.status(200).json({
        message: 'Libro actualizado correctamente',
        libro: libros[libroIndex]
    });
});

/**
 * @swagger
 * /libros/{id}:  <-- Updated path
 * delete:
 * summary: Elimina un libro por su ID.
 * tags: [Libros]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID (ISBN) del libro a eliminar
 * responses:
 * 200:
 * description: Libro eliminado correctamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libro eliminado correctamente
 * deledtedLibro:
 * $ref: '#/components/schemas/Libro'
 * 400:
 * description: ID de libro requerido.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: ID de libro requerido
 * 404:
 * description: Libro no encontrado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Libro no encontrado
 */
router.delete("/:id", (req, res) => { // Route path is relative to the router's mount point
    if (!req.params.id) {
        return res.status(400).json({
            message: 'ID de libro requerido',
        });
    }
    const libroIndex = libros.findIndex(elem => {
        return elem.id === req.params.id;
    });
    if (libroIndex < 0) {
        return res.status(404).json({
            message: 'Libro no encontrado',
        });
    }
    const deledtedLibro = libros.splice(libroIndex, 1);
    res.status(200).json({
        message: 'Libro eliminado correctamente',
        deledtedLibro
    });
});

module.exports = router; // Export the router for use in app.js