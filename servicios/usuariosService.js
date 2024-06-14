const MongoLib = require('../lib/mongo')

class UsuariosService {
    constructor(){
        this.collection = 'usuarios'
        this.mongoDB = new MongoLib()
    }

    async getUsuarios(){
        const usuarios = await this.mongoDB.getAll(this.collection)
        return usuarios || []
    }

    async getUsuarioById(id){
        const usuario = await this.mongoDB.getUserById(this.collection, id)
        return usuario || []
    }

    async getUserByName(name){
        const usuario = await this.mongoDB.getUserByName(this.collection, name)
        return usuario || []
    }

} 

module.exports = UsuariosService;


