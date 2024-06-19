// routes/jugadores.js
const express = require("express");
const router = express.Router();
const sequelize = require('../models/index').sequelize;

var initModels = require("../models/init-models");

var models =  initModels(sequelize);

/* GET users listing. */

/*  GET */

router.get("/", async (req, res) => {
  try {
    const representantes = await models.representante.findAll({
      include: [
        {
          model: models.jugador,
          as:"jugador"
        },
      ],
    });

    res.json(representantes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

/*  GET por ID*/
// Manejar la solicitud GET para obtener un contacto por su ID
router.get("/:id", (req, res) => {});

/*  POST */
router.post("/", async (req, res) => {
  const {
    cedula,
    nombres_representante,
    apellidos_representante,
    telefono,
    correo,
    jugador_id
  } = req.body;

  try {
      // const nuevoJugador = await models.jugador.create(jugador, {
      //   transaction: t,
      // });

      const nuevoRepresentante = await models.representante.create(
        {
          cedula,
          nombres_representante,
          apellidos_representante,
          telefono,
          correo,
          jugador_id 
        }
      );
     
  
    res.status(201).json(nuevoRepresentante);
  } catch (error) {
    console.error("Error al crear el representante:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

module.exports = router;


