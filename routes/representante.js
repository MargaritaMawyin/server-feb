// routes/jugadores.js
const express = require('express');
const router = express.Router();
const db = require('../db');
/* GET users listing. */

/*  GET */

router.get('/', (req, res) => {
  db.query('SELECT * FROM Representante', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


/*  GET por ID*/
// Manejar la solicitud GET para obtener un contacto por su ID
router.get("/:id", (req, res) => {
  const representanteId = req.params.id; // Obtener el ID del contacto de los parámetros de la URL

  // Construir la consulta SQL para obtener el contacto por su ID
  const query = "SELECT * FROM Representante WHERE contacto_id = ?";

  // Ejecutar la consulta SQL con el ID proporcionado como parámetro
  db.query(query, [representanteId], (err, results) => {
    if (err) {
      console.error("Error al obtener el representante:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Representante no encontrado" });
    }

    // Devolver el jugador encontrado como respuesta
    res.json(results[0]);
  });
});

/*  POST */
router.post("/create", (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const cedula = "1114567890";
  const nombre_representante = 'Jose';
  const apellido_representante = "Lopez";
  const telefono = '0987654444';
  const correo = 'prueba@hotmail.es';

  

  // Query para insertar un nuevo jugador en la tabla Jugador
  const query = `
    INSERT INTO Representante (
    cedula,
    nombre_representante,
    apellido_representante,
    telefono,
    correo
    ) VALUES (?, ?, ?, ?, ?)
  `;

  // Valores a insertar en la tabla Jugador
  const values = [cedula, nombre_representante, apellido_representante, telefono, correo];

  // Ejecutar la consulta en la base de datos
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err.stack);
      return res.status(500).json({ error: "Error interno del servidor" , details: err.message});
    }

    // Si la inserción fue exitosa, devolver el ID del nuevo jugador
    res.json({
      message: "Representante creado con éxito",
      jugador_id: results.insertId,
    });
  });
});


/*  PUT */  //REVISAR PORQ SALE REPRESENTANTE NO ENCONTRADO
router.put("/:representante_id", (req, res) => {
  const representanteId = req.params.jugador_id;
  const {
    cedula,
    nombre_representante,
    apellido_representante,
    telefono,
    correo
  } = req.body;

  const getCurrentDataQuery = "SELECT * FROM Representante WHERE representante_id = ?";

  db.query(getCurrentDataQuery, [representanteId], (err, results) => {
    if (err) {
      console.error(
        "Error al obtener los datos actuales del representante:",
        err.stack
      );
      return res
        .status(500)
        .json({
          error: "Error al obtener los datos actuales del representante",
          details: err.message,
        });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Representante no encontrado" });
    }

    const currentData = results[0];

    // Actualizar solo los campos que se han proporcionado
    const updatedData = {
      cedula: cedula !== undefined ? cedula : currentData.cedula,
      nombre_representante: nombre_representante !== undefined ? nombre_representante : currentData.nombre_representante,
      apellido_representante: apellido_representante !== undefined ? apellido_representante : currentData.apellido_representante,
      telefono: telefono !== undefined ? telefono : currentData.telefono,
      correo: correo !== undefined ? correo : currentData.correo,
    
    };

    // Query para actualizar los datos del jugador en la tabla Jugador
    const query = `
    UPDATE Representante
    SET cedula = ?, nombre_representante = ?, apellido_representante = ?, telefono = ?, correo = ?
    WHERE representante_id = ?
  `;

    // Valores a actualizar en la tabla Jugador
    const values = [
      updatedData.cedula,
      updatedData.nombre_representante,
      updatedData.apellido_representante,
      updatedData.telefono,
      updatedData.correo,
      representanteId,
    ];

    // Ejecutar la consulta en la base de datos
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err.stack);
        return res
          .status(500)
          .json({ error: "Error interno del servidor", details: err.message });
      }

      // Verificar si se actualizó correctamente y devolver una respuesta
      if (results.affectedRows > 0) {
        res.json({ message: "Datos del representante actualizados correctamente" });
      } else {
        res.status(404).json({ error: "Representante no encontrado" });
      }
    });
  });
});

module.exports = router;
