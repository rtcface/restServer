const express = require('express');

 

class Server {

    constructor(params) {
        this.app = express();
        this.port = process.env.PORT;

        // Middleware
        this.middlewares();

        // Routes for my app
        this.routes();
    }

    middlewares() {
        // Public dirctory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World')
          });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Express Server run on port ${this.port}`);
        });
    }

}

module.exports = Server;
