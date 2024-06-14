const MongoLib = require('../lib/mongo')

class MensajesService {
    constructor(){
        this.collection = 'mensajes'
        this.mongoDB = new MongoLib()
    }
    
    async getMensajes(){
        const mensajes = await this.mongoDB.getAll(this.collection)
        return mensajes || []
    }

    async getMensajesByUser(id) {
        console.log(`Buscando mensajes para el userId: ${id}`);
        const mensajes = await this.mongoDB.getMessagesByUser(id)
        console.log(`Mensajes encontrados: ${mensajes.length}`);
        return mensajes || []
    }

    async enviarMensajeUser(id, data){    
        const mensaje  = await this.mongoDB.createMessage(id, data)
        return mensaje || []
    }

} 

module.exports = MensajesService;