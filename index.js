const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');

const bloquesAPI = require('./rutas/bloques');
const usuariosAPI = require('./rutas/usuarios');
const mensajesAPI = require('./rutas/mensajes');
const fichasAPI = require('./rutas/fichas');

// Para datos JSON
app.use(bodyParser.json({ limit: '50mb' }));

// Para datos URL-encoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

bloquesAPI(app)
usuariosAPI(app)
mensajesAPI(app)
fichasAPI(app)
//app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'public')));

// Redirige todas las solicitudes a 'index.html' para que Angular maneje el enrutamiento
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port= '8080'

var server = app.listen(port, () => {
    console.log(`servidor escuchando en ${server.address().port}`);
})