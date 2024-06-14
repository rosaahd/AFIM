const MongoLib = require('../lib/mongo')

class BloquesService {
    constructor(){
        this.collection = 'bloques'
        this.mongoDB = new MongoLib()
    }

    async getBloques(){
        const bloques = await this.mongoDB.getAll(this.collection)
        return bloques || []
    }

    async getBloqueById(id){
        const bloque = await this.mongoDB.getById(this.collection, id)
        return bloque || []
    }

    async anadirBloque( data){    
        const mensaje  = await this.mongoDB.create(this.collection, data)
        return mensaje || []
    }

    async getFichas(){
        const bloques = await this.mongoDB.getAll(this.collection)
        const fichas = bloques.flatMap(bloque => bloque.fichas || [])
        return fichas || []
    }

    async getFichaById(fichaId){
        const bloques = await this.mongoDB.getAll(this.collection)
        for (const bloque of bloques) {
            const ficha = bloque.fichas.find(ficha => ficha.id === fichaId)
            if (ficha) return ficha
        }
        return null
    }

    async getFichasByBloqueId(bloqueId){
        const bloque = await this.mongoDB.getById(this.collection, bloqueId)
        return bloque ? (bloque.fichas || []) : []
    }

    async anadirFichaBloque(bloqueId, fichaData) {
        const newFichaId = await this.mongoDB.createFicha(bloqueId, fichaData);
        return { fichaId: newFichaId, message: "Ficha añadida con éxito" };
    }

} 

module.exports = BloquesService


