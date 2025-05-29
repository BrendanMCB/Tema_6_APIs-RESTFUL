const express = require("express");
const app = express();
/**
 * @swagger
 * tags:
 *  name: Libros
 *  description: API para gestionar libros
 */

/**
 * @swagger
 *  components:
 *     schemas:
 *       Libro:
 *          type: object
 *          required:
 *            - titulo
 *            - autor
 *            - editorial
 *            - id
 *          properties:
 *             titulo:
 *                type: string
 *                description: Título del libro
 *             autor:
 *                type: string
 *                description: Autor del libro
 *             editorial:
 *                type: string
 *                description: Editorial del libro
 *             id:
 *                type: string
 *                description: ISBN del libro
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

app.get('/search', (req, res) => {
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


app.post("/", (req, res) => {
    if (!req.body) {
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
app.put("/:id", (req, res) => {
    if (!req.body || !req.params.id) {
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

app.delete("/:id", (req, res) => {
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

module.exports = app;


