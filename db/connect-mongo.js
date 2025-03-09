const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        const url = 'mongodb://yinethpalacios:iwj3QSMA1ShsTqV1@cluster0-shard-00-00.5visb.mongodb.net:27017,cluster0-shard-00-01.5visb.mongodb.net:27017,cluster0-shard-00-02.5visb.mongodb.net:27017/?ssl=true&replicaSet=atlas-n5eaxh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
        
        // 'mongodb+srv://yinethpalacios:iwj3QSMA1ShsTqV1@cluster0.5visb.mongodb.net/api-res?retryWrites=true&w=majority&appName=Cluster0'


        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);   
    }
}
    
    module.exports = {
        getConnection,
    }

