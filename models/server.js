const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db')
 

class Server {

    constructor(params) {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            users:      '/api/user',
        };

        //Connection to database
        this.connectDb();
        // Middleware
        this.middlewares();

        // Routes for my app
        this.routes();
    }

    middlewares() {
        
        //cors
        this.app.use( cors() );
        
        // read and parser from body
        this.app.use( express.json() );


        // Public dirctory
        this.app.use(express.static('public'));        
    }

    routes() {        
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));        
        this.app.use(this.paths.users, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Express Server run on port ${this.port}`);
        });
    }

    async connectDb(){
        await dbConnection();  
    }

}

module.exports = Server;
