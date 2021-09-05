const express = require('express');
const cors = require('cors');
 

class Server {

    constructor(params) {
        this.app = express();
        this.port = process.env.PORT;
        this.pathUserRoute =  '/api/user';
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
        
        this.app.use(this.pathUserRoute, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Express Server run on port ${this.port}`);
        });
    }

}

module.exports = Server;
