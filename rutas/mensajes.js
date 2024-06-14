const express = require('express');
const MensajesService = require('../servicios/mensajesService');

function mensajesAPI(app) {
  const router = express.Router();

  app.use('/api/mensajes', router);
  const mensajesService = new MensajesService();

  router.get('/', async function (req, res, next){
    try{
        const mensajes = await mensajesService.getMensajes()
        res.status(200).json(
            {
                data: mensajes,
                message: 'mensajes recuperados con éxito'
            }
        )
    } catch(err){
        console.log(`se produjo un error ${err}`)
    } 
})

  // Obtener todos los mensajes de un usuario
  router.get('/usuario/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const mensajes = await mensajesService.getMensajesByUser(Number(id));
      res.status(200).json({
        data: mensajes,
        message: 'Mensajes recuperados con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });

  // Enviar un mensaje a un usuario
  router.post('/usuario/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const { body: data } = req;
      const mensaje = await mensajesService.enviarMensajeUser(Number(id), data);
      res.status(201).json({
        data: mensaje,
        message: 'Mensaje enviado con éxito'
      });
    } catch (err) {
      console.log(`Se produjo un error: ${err}`);
      next(err);
    }
  });
}

module.exports = mensajesAPI;
