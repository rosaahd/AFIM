const express = require('express');
const BloquesService = require('../servicios/bloquesService');

function bloquesAPI(app) {
  const router = express.Router();

  app.use('/api/bloques', router);
  const bloquesService = new BloquesService();

  // Obtener todos los bloques
  router.get('/', async function (req, res, next) {
    try {
      const bloques = await bloquesService.getBloques();
      res.status(200).json({
        data: bloques,
        message: 'bloques recuperados con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Obtener un bloque por ID
  router.get('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const bloque = await bloquesService.getBloqueById(Number(id));
      res.status(200).json({
        data: bloque,
        message: 'bloque recuperado con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Añadir un nuevo bloque
  router.post('/', async function (req, res, next) {
    try {
      const { body: bloque } = req;
      const idBloqueAnadido = await bloquesService.anadirBloque(bloque);
      res.status(201).json({
        data: idBloqueAnadido,
        message: 'Bloque añadido con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

    // Añadir una ficha a un bloque
    router.post('/:id/fichas', async function (req, res, next) {
      try {
        const { id } = req.params;
        const { body: ficha } = req;
        const result = await bloquesService.anadirFichaBloque(Number(id), ficha);
        res.status(201).json({
          data: result,
          message: 'Ficha añadida con éxito'
        });
      } catch (err) {
        console.log(`Se produjo un error: ${err}`);
        next(err);
      }
    });

    // Obtener fichas de un bloque por ID
    router.get('/:id/fichas', async function (req, res, next) {
      try {
        const { id } = req.params;
        const fichas = await bloquesService.getFichasByBloqueId(Number(id));
        res.status(200).json({
          data: fichas,
          message: 'Fichas recuperadas con éxito'
        });
      } catch (err) {
        console.log(`Se produjo un error: ${err}`);
        next(err);
      }
    });
  }

module.exports = bloquesAPI;