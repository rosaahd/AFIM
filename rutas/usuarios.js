const express = require('express');
const UsuariosService = require('../servicios/usuariosService');

function usuariosAPI(app) {
  const router = express.Router();

  app.use('/api/usuarios', router);
  const usuariosService = new UsuariosService();

  // Obtener todos los usuarios
  router.get('/', async function (req, res, next) {
    try {
      const users = await usuariosService.getUsuarios();
      res.status(200).json({
        data: users,
        message: 'Usuarios recuperados con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Obtener un usuario por ID
  router.get('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const user = await usuariosService.getUsuarioById(Number(id));
      res.status(200).json({
        data: user,
        message: 'Usuario recuperado con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Obtener un usuario por nombre
  router.get('/name/:name', async function (req, res, next) {
    try {
      const { name } = req.params;
      const user = await usuariosService.getUserByName(name);
      res.status(200).json({
        data: user,
        message: 'Usuario recuperado con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Añadir un nuevo usuario
  router.post('/', async function (req, res, next) {
    try {
      const { body: user } = req;
      const idUsuarioAnadido = await usuariosService.addUser(user);
      res.status(201).json({
        data: idUsuarioAnadido,
        message: 'Usuario añadido con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });
}

module.exports = usuariosAPI;
