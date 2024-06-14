const MongoClient = require('mongodb').MongoClient


//PONER MIS DATOS DE LA BBDD
const USER = 'system'
const PASSWORD =  'manager'
const DB_NAME = 'AFIM'
const DB_HOST = 'cluster0.rd6s0qb.mongodb.net'

//mongodb+srv://system:manager@cluster0.rd6s0qb.mongodb.net/
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?appName=${DB_NAME}`

class MongoLib {
    constructor(){
        this.veces = 0;
    }

    async connect() {
        this.veces++;     
        console.log(`Connect invocado ${this.veces} veces`);

        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI);
                return MongoLib.connection.db(DB_NAME);
            } catch(e){
                console.log('error en conexión a BBDD');
                return e;
            }
        }
    }

    async getAll(collection) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async getById(collection, id) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).findOne({ id: id });
            return result;
        } catch (e) {
            return e;
        }
    }

    async create(collection, data) {
        try {
            let db = await this.connect();
            
            let count = await db.collection(collection).countDocuments();
            
            data.id = count + 1;
    
            let result = await db.collection(collection).insertOne(data);
            
            return result.insertedId;
        } catch (e) {
            console.log('Error al insertar:', e);
            return e;
        }
    }
    

    async update(collection, id, data) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).updateOne({ id: id }, { $set: data }, { upsert: true });
            return result;
        } catch(e){
            console.log('error al modificar');
            return e;
        }
    }

    async delete(collection, id) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).deleteOne({ id: id }).toArray();
            return result;
        } catch(e){
            console.log('error al borrar');
            return e;
        }
    }

    // Métodos específicos para usuarios

    async getUserById(collection, id) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).findOne({ id:id });
            return result;
        } catch (e) {
            return e;
        }
    }

    async getUserByName(name) {
        try {
            let db = await this.connect();
            let result = await db.collection('usuarios').findOne({ name: name });
            return result;
        } catch (e) {
            return e;
        }
    }

    // Métodos específicos para mensajes

    async getMessagesByUser(userId) {
        try {
            let db = await this.connect();
            let result = await db.collection('mensajes').find({ userId: userId }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async createMessage(userId, messageData) {
        try {
            let db = await this.connect();
            let data = { ...messageData, userId: userId };
            let result = await db.collection('mensajes').insertOne(data);
            return result.insertedId;
        } catch(e){
            console.log('error al insertar mensaje');
            return e;
        }
    }

    async deleteMessagesByUser(userId) {
        try {
            let db = await this.connect();
            let result = await db.collection('mensajes').deleteMany({ userId: userId });
            return result;
        } catch(e){
            console.log('error al borrar mensajes');
            return e;
        }
    }

    // Métodos específicos para fichas

    async getFichasByBloque(bloqueId) {
        try {
            let db = await this.connect();
            let result = await db.collection('fichas').find({ bloqueId: bloqueId }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async getFichaById(id) {
        try {
            let db = await this.connect();
            let result = await db.collection('fichas').find({ id:id }).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async createFicha(bloqueId, fichaData) {
        try {
            let db = await this.connect();
            
            const newFicha = { ...fichaData}; 
            
            let result = await db.collection('bloques').updateOne(
                { id: bloqueId },
                { $push: { fichas: newFicha } }
            );
            
            if (result.modifiedCount === 1) {
                return newFicha.id;
            } else {
                throw new Error('No se pudo insertar la ficha');
            }
        } catch (e) {
            console.log('Error al insertar ficha:', e);
            return e;
        }
    }

    async deleteFichasByBloque(bloqueId) {
        try {
            let db = await this.connect();
            let result = await db.collection('fichas').deleteMany({ bloqueId: bloqueId });
            return result;
        } catch(e){
            console.log('error al borrar fichas');
            return e;
        }
    }
}

module.exports = MongoLib;