const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN, { 
                useNewUrlParser: true,
                // useUnifedTopology: true,
                // useCreateIndex: true,
                // useFindAndModify: false,              
        } );

        console.log('Data-Base online');
    } catch (error) {
        console.log(error);
        console.log('error DB ');
    }

}


module.exports = {
    dbConnection
};
