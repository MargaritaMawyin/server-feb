const express = require("express");
const router = express.Router();
const db = require("../db");
const models = require("../models");

router.get("/", async (req, res) => {
    try {
      const club = await models.club.findAll();
  
      if (club) {
        res.json(club);
      } else {
        res.status(404).json({ error: "Club no encontrado" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error interno del servidor", details: err.message });
    }
  });

  /*  GET por id*/
router.get("/:id", async (req, res) => {
  try {
    const club = await models.club.findOne({
      where: { club_id: req.params.id },
     
    });

    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ error: "club no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});


/*  GET por nombre*/
router.get("/nombre/:nombre", async (req, res) => {
  console.log(decodeURIComponent(req.params.nombre))

  try {
    const club = await models.club.findOne({
      where: { club_nombre: req.params.nombre
      },
     
    });
console.log(club)
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ error: "club no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

  /*  POST */
router.post("/create", async (req, res) => {
  const {
    club_nombre,
        ruc,
        presidente,
        delegado,
        provincia,
        ciudad,
        registro_de_directorio,
        acuerdo_ministerial,
        telefono,
        correo,
        estado,
  } = req.body;

  try {
  

    const nuevoClub = await models.club.create({
      club_nombre,
        ruc,
        presidente,
        delegado,
        provincia,
        ciudad,
        registro_de_directorio,
        acuerdo_ministerial,
        telefono,
        correo,
        estado,
    });

    res.status(201).json(nuevoClub);
  } catch (error) {
    console.error("Error al crear el club:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});

/* PUT */

router.put("/update/:id", async (req, res) => {
  const {
    club_nombre,
        ruc,
        presidente,
        delegado,
        provincia,
        ciudad,
        registro_de_directorio,
        acuerdo_ministerial,
        telefono,
        correo,
        estado,
  } = req.body;

  
  try {
    // Buscar el club por ID
    const club = await models.club.findOne({
      where: { club_id: req.params.id },
    });
    if (!club) {
      return res.status(404).json({ error: 'club no encontrado' });
    }
    club.club_nombre = club_nombre ?? club.club_nombre;
    club.ruc = ruc ?? club.ruc;  
    club.presidente = presidente ?? club.presidente;
    club.delegado = delegado ?? club.delegado;  
    club.provincia = provincia ?? club.provincia;
    club.ciudad = ciudad ?? club.ciudad;
    club.registro_de_directorio = registro_de_directorio ?? club.registro_de_directorio;
    club.acuerdo_ministerial = acuerdo_ministerial ?? club.acuerdo_ministerial;  
    club.telefono = telefono ?? club.telefono;
    club.correo = correo ?? club.correo;
    club.estado = estado ?? club.estado;
  

    // Guardar los cambios en la base de datos
    await club.save();
    res.status(200).json(club);
  } catch (error) {
    console.error('Error al actualizar el club:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

/* DELETE */ 
router.delete('/delete/:id', async (req, res) => {

  try {
    const club = await models.club.findOne({
      where: { club_id: req.params.id },
    }); if (!club) {
      return res.status(404).json({ error: 'club no encontrado' });
    }

    await club.destroy();
    return res.status(200).json({ message: 'club eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el club:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});
  module.exports = router;
