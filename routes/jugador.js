// routes/jugadores.js
const express = require("express");
const router = express.Router();
const sequelize = require('../models/index').sequelize;
var initModels = require("../models/init-models");

var models =  initModels(sequelize);
/*  GET */
router.get("/", async (req, res) => {
  try {
    const jugadores = await models.jugador.findAll({
      include: [{
        model:models.contacto,
        as: "contacto", // Alias para el modelo asociado (definido en la asociación)
      },
      {
        model: models.documentacion,
        as: "documentacion", // Alias para el modelo asociado (definido en la asociación)
      } ],
    });


    res.json(jugadores);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jugador = await models.jugador.findOne({
      where: { jugador_id: req.params.id },
      // include: [],
    });

    if (jugador) {
      res.json(jugador);
    } else {
      res.status(404).json({ error: "Jugador no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

// Ruta para crear un nuevo jugador
router.post("/", async (req, res) => {
  const {
    
    documentacion,
    contacto,
    nombre_club,
    nombres,
    apellidos,
    fecha_de_nacimiento,
    cedula,
    edad,
    sexo,
    nacionalidad,
    estatura,
    peso,
    fecha_de_inscripcion,
    representante,
    tipo_de_sangre,
    posicion,
    comentario,
    estado,
    esLibre,
    licencia
  } = req.body;


  try {
    const result = await models.sequelize.transaction(async (t) => {
      // Crear el registro de Documentacion
      const nuevaDocumentacion = await models.documentacion.create(
        documentacion,
        { transaction: t }
      );

      //Crear el registro de Contacto
      const nuevoContacto = await models.contacto.create(contacto, {
        transaction: t,
      });

      // Crear el registro de Jugador asociado con Documentacion y Contacto
      const nuevoJugador = await models.jugador.create(
        {
         
          // documentacion_id, // Usar el ID generado por Sequelize
          // contacto_id: nuevoContacto.contacto_id,
          nombre_club,
          nombres,
          apellidos,
          fecha_de_nacimiento,
          cedula,
          edad,
          sexo,
          nacionalidad,
          estatura,
          peso,
          fecha_de_inscripcion,
          representante,
          tipo_de_sangre,
          posicion,
          comentario,
          estado,
          esLibre,
          licencia,
          documentacion_id: nuevaDocumentacion.documentacion_id,
          contacto_id: nuevoContacto.contacto_id,
          // Usar el ID generado por Sequelize
        },

        { transaction: t ,     // include: [models.documentacion, models.contacto]
        }
      );
     
      return nuevoJugador;
    });
    

    res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear el jugador:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

module.exports = router;
