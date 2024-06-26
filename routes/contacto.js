// routes/jugadores.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
/* GET users listing. */
const models = require("../models");
const { where } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const contacto = await models.contacto.findAll();

    if (contacto) {
      res.json(contacto);
    } else {
      res.status(404).json({ error: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

/*  GET por ID*/
// Manejar la solicitud GET para obtener un contacto por su ID
router.get("/:id", async (req, res) => {
  try {
    const contacto = await models.contacto.findOne({
      where: { contacto_id: req.params.id },
    });

    if (contacto) {
      res.json(contacto);
    } else {
      res.status(404).json({ error: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

/*  POST */
router.post("/create", async (req, res) => {
  // try {
  //   const { pais, provincia, ciudad, direccion, telefono } = req.body;
  //   // Crear el contacto en la base de datos
  //   const nuevoContacto = await models.contacto.create({
  //     pais,
  //     provincia,
  //     ciudad,
  //     direccion,
  //     telefono
  //   });
  //   res.status(201).json(nuevoContacto);
  // } catch (error) {
  //   console.error('Error al crear el contacto:', error);
  //   res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  // }
});

/* PUT */
router.put("/update/:id", async (req, res) => {
  
  const { pais, provincia, ciudad, direccion, telefono } = req.body;

  const camposAActualizar = {};
  if (pais !== undefined) camposAActualizar.pais = pais;
  if (provincia !== undefined) camposAActualizar.provincia = provincia;
  if (ciudad !== undefined) camposAActualizar.ciudad = ciudad;
  if (direccion !== undefined) camposAActualizar.direccion = direccion;
  if (telefono !== undefined) camposAActualizar.telefono = telefono;
  try {
    // Buscar el contacto por ID
    const contacto = await models.contacto.findOne({
      where: { contacto_id: req.params.id },
    });
    if (!contacto) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    // Guardar los cambios en la base de datos
    await contacto.update(camposAActualizar);
    res.status(200).json(contacto);
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

module.exports = router;
