mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    //host: 'mysql',
    user: 'root',
    password: '12345',
});

//Conectarnos al servidor
db.connect((err) => {
    if (err) {
        console.log("Error en la conexion al server");
        return;
    }

    // Verificar si existe la base de datos
    db.query("CREATE DATABASE IF NOT EXISTS cruddb2", (err) => {
        if (err) {
            console.log("Error al crear la db");
            return;
        }
        console.log("DB creada o ya existente");
    });

    // Seleccionar base de datos
    db.query("USE cruddb2", (err) => {
        if (err) {
            console.log("Error al seleccionar la db");
            return;
        }
        console.log("Conexion exitosa");
    });
    const createTableSQLoficina = `
        CREATE TABLE IF NOT EXISTS oficina (
            id INT AUTO_INCREMENT PRIMARY KEY,
            denominacion VARCHAR(255)            
        ) 
    `;

    // Verificar si existe la tabla persona
    const createTableSQLpersona = `
        CREATE TABLE IF NOT EXISTS persona (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255),
            email VARCHAR(255),
            oficina_id INT,
            FOREIGN KEY (oficina_id) REFERENCES oficina(id)
        ) 
    `;

    db.query(createTableSQLoficina, (err) => {
        if (err) {
            console.log("Error al crear la tabla");
            return;
        }
    });
    db.query(createTableSQLpersona, (err) => {
        if (err) {
            console.log("Error al crear la tabla");
            return;
        }
    });


});

module.exports = db;
