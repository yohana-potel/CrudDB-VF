
var express = require('express');

const listPersonas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from persona";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista" });
    })
}

const agregarPersona = function(req, res, next) {
    res.render('agregar', { title: "Agregar" });
}

const postAgregarPersona = function(req, res, next) {
    const db = req.app.get("db");
    const nombre = req.body.nombre;
    const email = req.body.email;
    const query = "INSERT into persona (nombre, email) VALUES (?, ?)";
    db.query(query, [nombre, email], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personas");
    })
}

const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit', { item: rows[0], title: "Editar" });
    });
}

const postUpdatePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email; // Obtén la descripción del formulario
    db.query("UPDATE persona SET nombre=?, email=? WHERE id=?", [nombre, email, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
}

const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar" });
    });
}

const postDeletePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    console.log('ID de la persona a eliminar:', id);
    db.query("DELETE FROM persona WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
}

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar" });
}

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM persona WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados', { personas: rows, title: "Resultados" })
    });
}
const tablaOficina = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.query.keyword;

    const query = `
        SELECT persona.nombre, persona.email, oficina.denominacion
        FROM persona
        JOIN oficina ON persona.id= oficina.id
    `;
    
    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error interno en el servidor');
        } else {
            // Renderiza la vista 'oficinas' con los resultados 
            res.render('oficinas', { title: 'Oficinas', resultados: resultados });
        }
    });
};

   




module.exports = {
    listPersonas,
    agregarPersona,
    postAgregarPersona,
    getEditarPersona,
    postUpdatePersona,
    getDeletePersona,
    postDeletePersona,
    buscarPersona,
    buscarPersonaResultados,

    tablaOficina
};