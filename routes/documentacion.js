// routes/jugadores.js
const express = require("express");
const router = express.Router();
const models = require("../models");

/* GET users listing. */

router.get("/", async (req, res) => {
  try {
    const documento = await models.documentacion.findAll({
      // include: [
      // { model: models.jugador, as: "jugadors" }
      // { model: Documentacion },
      // { model: Contacto }
      // ]
    });
    res.json(documento);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

router.get("/:id/", async (req, res) => {
  try {
    const documento = await models.documentacion.findOne({
      where: { documentacion_id: req.params.id },

      // include: [
      // { model: models.jugador, as: "jugadors" }
      // { model: Documentacion },
      // { model: Contacto }
      // ]
    });
    res.json(documento);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

// POST /documentacion (Create a new documentacion)
router.post("/", async (req, res) => {
    try {
      const { ficha_sin_firmar, ficha_firmada, foto, ficha_medica } = req.body;
      const nuevaDocumentacion = await models.documentacion.create({
        ficha_sin_firmar:null,
        ficha_firmada:null,
        foto:null,
        ficha_medica:null
      });
      console.log(nuevaDocumentacion)
      res.status(201).json(nuevaDocumentacion);
    } catch (error) {
      res.status(500).json({ error: 'Error creating documentacion', details: error.message });
    }
});
module.exports = router;
