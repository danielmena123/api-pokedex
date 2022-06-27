const mongoose = require('mongoose');
require("dotenv").config({path: '.env'});

const conectarDB = async () => {
    try {
        await mongoose 
                    .connect(process.env.MongoDB, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })
                    console.log('Connected to MongoDB') 
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = conectarDB;