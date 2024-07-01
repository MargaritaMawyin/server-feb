// routes/jugadores.js
const express = require("express");
const router = express.Router();
const db = require('../models'); // Asegúrate de que la ruta sea correcta

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
      } ,
      {
        model: models.club,
        as: "club", // Alias para el modelo asociado (definido en la asociación)
      }],
    });


    res.json(jugadores);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});
/*  GET por id*/
router.get("/:id", async (req, res) => {
  try {
    const jugador = await models.jugador.findOne({
      where: { jugador_id: req.params.id },
      include: [{
        model:models.contacto,
        as: "contacto", // Alias para el modelo asociado (definido en la asociación)
      },
      {
        model: models.documentacion,
        as: "documentacion", // Alias para el modelo asociado (definido en la asociación)
      },
      {
        model: models.club,
        as: "club", // Alias para el modelo asociado (definido en la asociación)
      } ],
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

// POST
router.post("/create", async (req, res) => {
  const {
    club,
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
    const result = await db.sequelize.transaction(async (t) => {
      // Crear el registro de Documentacion
      const nuevaDocumentacion = await db.documentacion.create(
        documentacion,
        { transaction: t }
      );
      // Crear el registro de CLub
      const nuevoClub = await db.club.create(
        club,
        { transaction: t }
      );

      //Crear el registro de Contacto
      const nuevoContacto = await db.contacto.create(contacto, {
        transaction: t,
      });

      // Crear el registro de Jugador asociado con Documentacion y Contacto
      const nuevoJugador = await db.jugador.create(
        {
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
          club_id: nuevoClub.club_id,
        },

        { transaction: t ,  
        //   include: [{
        //   model:models.contacto,
        //   as: "contacto", // Alias para el modelo asociado (definido en la asociación)
        // },
        // {
        //   model: models.documentacion,
        //   as: "documentacion", // Alias para el modelo asociado (definido en la asociación)
        // } ],
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

/* PUT */
router.put("/update/:id", async (req, res) => {
  
  const { 
        nombre_club,
        nombres,
        apellidos,
        fecha_de_nacimiento,
        //cedula, SE EXCLUYE DE MODIFICACION POR SEGURIDAD
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
        //licencia SE EXCLUYE DE MODIFICACION POR SEGURIDAD
        } = req.body;

    try {
    // Buscar el doc por ID
    const jugador = await models.jugador.findOne({
      where: { jugador_id: req.params.id },
    });
    if (!jugador) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }
    // Actualizar solo los campos permitidos
    jugador.nombre_club = nombre_club ?? jugador.nombre_club;
    jugador.nombres = nombres ?? jugador.nombres;
    jugador.apellidos = apellidos ?? jugador.apellidos;
    jugador.fecha_de_nacimiento = fecha_de_nacimiento ?? jugador.fecha_de_nacimiento;
    jugador.edad = edad ?? jugador.edad;
    jugador.sexo = sexo ?? jugador.sexo;
    jugador.nacionalidad = nacionalidad ?? jugador.nacionalidad;
    jugador.estatura = estatura ?? jugador.estatura;
    jugador.peso = peso ?? jugador.peso;
    jugador.fecha_de_inscripcion = fecha_de_inscripcion ?? jugador.fecha_de_inscripcion;
    jugador.representante = representante ?? jugador.representante;
    jugador.tipo_de_sangre = tipo_de_sangre ?? jugador.tipo_de_sangre;
    jugador.posicion = posicion ?? jugador.posicion;
    jugador.comentario = comentario ?? jugador.comentario;
    jugador.estado = estado ?? jugador.estado;
    jugador.esLibre = esLibre ?? jugador.esLibre;

    // Guardar los cambios
    await jugador.save();
    res.status(200).json(jugador);
  } catch (error) {
    console.error('Error al actualizar el jugador:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/* DELETE */ 
router.delete('/delete/:id', async (req, res) => {

  try {
    const jugador = await models.jugador.findOne({
      where: { jugador_id: req.params.id },
    }); if (!jugador) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    await jugador.destroy();
    return res.status(200).json({ message: 'Jugador eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el jugador:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});
module.exports = router;
