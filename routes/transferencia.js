const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */


router.get('/', (req, res) => {
  db.query('SELECT * FROM Transferencia', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ruta para crear una nueva transferencia con datos quemados
router.post('/create', (req, res) => {
  const jugador_id = 1; // Cambia esto por un ID válido de jugador
  const cedula = '1234567890'; // Datos quemados
  const anterior_nombre_del_club = 'Club A';
  const nuevo_nombre_del_club = 'Club B';
  const fecha = '2024-06-03';
  const estado = 'pendiente';

  const query = 'INSERT INTO Transferencia (jugador_id, cedula, anterior_nombre_del_club, nuevo_nombre_del_club, fecha, estado) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [jugador_id, cedula, anterior_nombre_del_club, nuevo_nombre_del_club, fecha, estado];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.stack);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Transferencia creada con éxito', id: results.insertId });
  });
});

module.exports = router;
