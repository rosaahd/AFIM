const express = require('express');
const BloquesService = require('../servicios/bloquesService');

function fichasAPI(app) {
  const router = express.Router();

  app.use('/api/fichas', router);
  const bloquesService = new BloquesService();

  // Obtener todas las fichas
  router.get('/', async function (req, res, next) {
    try {
      const fichas = await bloquesService.getFichas();
      res.status(200).json({
        data: fichas,
        message: 'Fichas recuperadas con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Obtener una ficha por ID
  router.get('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const ficha = await bloquesService.getFichaById(Number(id));
      res.status(200).json({
        data: ficha,
        message: 'Ficha recuperada con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });


  // Añadir una nueva ficha
  router.post('/', async function (req, res, next) {
    try {
      const { body: ficha } = req;
      const idFichaAnadida = await bloquesService.anadirFichaBloque(ficha);
      res.status(201).json({
        data: idFichaAnadida,
        message: 'Ficha añadida con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });
}

module.exports = fichasAPI;
