const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd3103'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Base de Datos Conectada Correctamente!!');
});


function registrar(datos, callback) {
  const { Proyecto } = datos;

  console.log({ Proyecto });

  const sql = `INSERT INTO prueba (nombre) VALUES (?)`;

  connection.query(sql, [Proyecto], (error, results, fields) => {
    if (error) return callback(error);
    callback(null, results);
  });
}


// Función para mostrar los datos de la base de datos
function mostrarDatos() {
  return new Promise((resolve, reject) => {
    // Ejecuta la consulta en la base de datos
    connection.query(`SELECT Descripcion_estado FROM estados_registro`, (error, results) => {
      if (error) {
        console.log(error);
        reject(error); // Usar reject en caso de error
      } else {
        resolve(results);
      }
    });
  });
}

// Función para mostrar los datos de la base de datos
function subtipo() {
  return new Promise((resolve, reject) => {
    // Ejecuta la consulta en la base de datos
    connection.query(`SELECT Nombre FROM subtipo`, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// Función para mostrar los datos de la base de datos
function subtipo2() {
  return new Promise((resolve, reject) => {
    // Ejecuta la consulta en la base de datos
    connection.query(`SELECT Nombre FROM subtipo2`, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// Función para mostrar los datos de la base de datos
function estrato() {
  return new Promise((resolve, reject) => {
    // Ejecuta la consulta en la base de datos
    connection.query(`SELECT Nombre FROM estrato`, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Función para mostrar los datos de la base de datos
function tipo_negocio() {
  return new Promise((resolve, reject) => {
    // Ejecuta la consulta en la base de datos
    connection.query(`SELECT Nombre FROM tipo_negocio`, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  tipo_negocio:tipo_negocio,
  estrato:estrato,
  subtipo2:subtipo2,
  subtipo: subtipo,
  registrar: registrar, 
  mostrarDatos: mostrarDatos 
};




 
  