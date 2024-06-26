// routes/jugadores.js
const express = require("express");
const router = express.Router();
const models = require("../models");
const upload = require("../uploads");

/* GET users listing. */

router.get("/", async (req, res) => {
  try {
    const documento = await models.documentacion.findAll();
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
    });
    res.json(documento);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

// // POST /documentacion (Create a new documentacion)
router.post("/create", async (req, res) => {
  try {
    const { ficha_sin_firmar, ficha_firmada, foto, ficha_medica } = req.body;
    const nuevaDocumentacion = await models.documentacion.create({
      ficha_sin_firmar: null,
      ficha_firmada: null,
      foto: null,
      ficha_medica: null,
    });
    console.log(nuevaDocumentacion);
    res.status(201).json(nuevaDocumentacion);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating documentacion", details: error.message });
  }
});

// Ruta para subir archivos y datos JSON
// router.post('/upload', upload.fields([
//   { name: 'ficha_sin_firmar', maxCount: 1 },
//   { name: 'ficha_firmada', maxCount: 1 },
//   { name: 'foto', maxCount: 1 },
//   { name: 'ficha_medica', maxCount: 1 },
//   { name: 'autorizacion_representante', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const {
//       ficha_sin_firmar,
//       ficha_firmada,
//       foto,
//       ficha_medica,
//       autorizacion_representante
//     } = req.files;

//     const documentacion = {
//       ficha_sin_firmar: ficha_sin_firmar ? ficha_sin_firmar[0].path : null,
//       ficha_firmada: ficha_firmada ? ficha_firmada[0].path : null,
//       foto: foto ? foto[0].path : null,
//       ficha_medica: ficha_medica ? ficha_medica[0].path : null,
//       autorizacion_representante: autorizacion_representante ? autorizacion_representante[0].path : null
//     };

//     const nuevaDocumentacion = await models.documentacion.create(documentacion);

//     res.status(201).json(nuevaDocumentacion);
//   } catch (error) {
//     console.error('Error al subir la documentación:', error);
//     res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//   }
// });

/* PUT */
router.put("/update/:id", async (req, res) => {
  const {
    ficha_sin_firmar,
    ficha_firmada,
    foto,
    ficha_medica,
    autorizacion_representante,
  } = req.body;

  const camposAActualizar = {};
  if (ficha_sin_firmar !== undefined)
    camposAActualizar.ficha_sin_firmar = ficha_sin_firmar;
  if (ficha_firmada !== undefined)
    camposAActualizar.ficha_firmada = ficha_firmada;
  if (foto !== undefined) camposAActualizar.foto = foto;
  if (ficha_medica !== undefined) camposAActualizar.ficha_medica = ficha_medica;
  if (autorizacion_representante !== undefined)
    camposAActualizar.autorizacion_representante = autorizacion_representante;
  try {
    // Buscar el doc por ID
    const doc = await models.documentacion.findOne({
      where: { documentacion_id: req.params.id },
    });
    if (!doc) {
      return res.status(404).json({ error: "Documentacion no encontrado" });
    }

    // Guardar los cambios en la base de datos
    await doc.update(camposAActualizar);
    res.status(200).json(doc);
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await models.sequelize.transaction(async (t) => {
      // Buscar todos los jugadores que dependen de la documentacion
      const jugadores = await models.jugador.findAll({
        where: { documentacion_id: id },
        transaction: t,
      });

      // Eliminar los jugadores dependientes
      for (const jugador of jugadores) {
        await jugador.destroy({ transaction: t });
      }

      // Buscar el registro de documentacion por ID
      const documentacion = await models.documentacion.findByPk(id, {
        transaction: t,
      });
      if (!documentacion) {
        return res.status(404).json({ error: "Documentación no encontrada" });
      }

      // Eliminar el registro de documentacion
      await documentacion.destroy({ transaction: t });

      return res
        .status(200)
        .json({
          message:
            "Documentación y jugadores dependientes eliminados exitosamente",
        });
    });
  } catch (error) {
    console.error("Error al eliminar la documentación:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

module.exports = router;
