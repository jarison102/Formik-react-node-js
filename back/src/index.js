const db = require('./db')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// Ruta para registrar datos
app.post('/register', (req, res) => {
  console.log(req.body)
  let errorGenerado = null;
  db.registrar(req.body, (error, results) => {z
    if (error) errorGenerado = error;
    console.log('Datos registrados correctamente:', results);
  });
  if (errorGenerado != null) {
    return res.json({
      id: '1',
      success: false
    });
  }
  res.json({
    id: '1',
    success: true
  });
});

// Ruta para obtener datos
app.get('/mostrar-datos', (req, res) => {
  db.mostrarDatos()
    .then((results) => {
      console.log(results);
      // Aquí puedes enviar los resultados en la respuesta del servidor
      res.json({
        success: true,
        datos: results
      });
    })
    .catch((error) => {
      console.error(error);
      // En caso de error, puedes enviar un mensaje de error en la respuesta del servidor
      res.json({
        success: false,
        error: 'Error al obtener datos de la base de datos'
      });
    });
});


// Ruta para obtener datos de subtipo
app.get('/subtipo', (req, res) => {
  db.subtipo()
    .then((results) => {
      console.log(results);
      // Aquí puedes enviar los resultados en la respuesta del servidor
      res.json({
        success: true,
        datos: results
      });
    })
    .catch((error) => {
      console.error(error);
      // En caso de error, puedes enviar un mensaje de error en la respuesta del servidor
      res.json({
        success: false,
        error: 'Error al obtener datos de subtipo en la base de datos'
      });
    });
});

// Ruta para obtener datos de subtipo
app.get('/subtipo2', (req, res) => {
  db.subtipo2()
    .then((results) => {
      console.log(results);
      // Aquí puedes enviar los resultados en la respuesta del servidor
      res.json({
        success: true,
        datos: results
      });
    })
    .catch((error) => {
      console.error(error);
      // En caso de error, puedes enviar un mensaje de error en la respuesta del servidor
      res.json({
        success: false,
        error: 'Error al obtener datos de subtipo en la base de datos'
      });
    });
});

// Ruta para obtener datos de estrato
app.get('/estrato', (req, res) => {
  db.estrato()
    .then((results) => {
      console.log(results);
      // Aquí puedes enviar los resultados en la respuesta del servidor
      res.json({
        success: true,
        datos: results
      });
    })
    .catch((error) => {
      console.error(error);
      // En caso de error, puedes enviar un mensaje de error en la respuesta del servidor
      res.json({
        success: false,
        error: 'Error al obtener datos de subtipo en la base de datos'
      });
    });
});

// Ruta para obtener datos de estrato
app.get('/tipo_negocio', (req, res) => {
  db.tipo_negocio()
    .then((results) => {
      console.log(results);
      // Aquí puedes enviar los resultados en la respuesta del servidor
      res.json({
        success: true,
        datos: results
      });
    })
    .catch((error) => {
      console.error(error);
      // En caso de error, puedes enviar un mensaje de error en la respuesta del servidor
      res.json({
        success: false,
        error: 'Error al obtener datos de subtipo en la base de datos'
      });
    });
});


app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
