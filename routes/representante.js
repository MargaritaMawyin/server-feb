// routes/jugadores.js
const express = require("express");
const router = express.Router();
const sequelize = require("../models/index").sequelize;

var initModels = require("../models/init-models");

var models = initModels(sequelize);

/* GET users listing. */

/*  GET */

router.get("/", async (req, res) => {
  try {
    const representantes = await models.representante.findAll({
      include: [
        {
          model: models.jugador,
          as: "jugador",
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
router.post("/create", async (req, res) => {
  const {
    cedula,
    nombres_representante,
    apellidos_representante,
    telefono,
    correo,
    jugador_id,
  } = req.body;

  try {
    // const nuevoJugador = await models.jugador.create(jugador, {
    //   transaction: t,
    // });

    const nuevoRepresentante = await models.representante.create({
      cedula,
      nombres_representante,
      apellidos_representante,
      telefono,
      correo,
      jugador_id,
    });

    res.status(201).json(nuevoRepresentante);
  } catch (error) {
    console.error("Error al crear el representante:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

/* PUT */

router.put("/update/:id", async (req, res) => {
  const {
    //cedula, SE EXCLUYE DE MODIFICACION POR SEGURIDAD
    nombres_representante,
    apellidos_representante,
    telefono,
    correo,
  } = req.body;

  
  try {
    // Buscar el representante por ID
    const representante = await models.representante.findOne({
      where: { representante_id: req.params.id },
    });
    if (!representante) {
      return res.status(404).json({ error: 'Representante no encontrado' });
    }
    representante.nombres_representante = nombres_representante ?? representante.nombres_representante;
    representante.apellidos_representante = apellidos_representante ?? representante.apellidos_representante;  
    representante.telefono = telefono ?? representante.telefono;
    representante.correo = correo ?? representante.correo;
  

    // Guardar los cambios en la base de datos
    await representante.save();
    res.status(200).json(representante);
  } catch (error) {
    console.error('Error al actualizar el representante:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});


/* DELETE */


module.exports = router;
