const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db')
const  fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/socket.controller');


class Server {

    constructor(params) {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths = {
            auth        :   '/api/auth',
            categories  :   '/api/categories',
            products    :   '/api/products',
            search      :   '/api/search',
            users       :   '/api/user',
            uploads     :   '/api/uploads',
        };

        //Connection to database
        this.connectDb();
        // Middleware
        this.middlewares();

        // Routes for my app
        this.routes();

        // the events web sockets
        this.webSocketEvents();
    }

    middlewares() {
        
        //cors
        this.app.use( cors() );
        
        // read and parser from body
        this.app.use( express.json() );


        // Public dirctory
        this.app.use(express.static('public'));        

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true,
        }));
            }

    routes() {        
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));        
        this.app.use(this.paths.products, require('../routes/products.routes'));        
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    webSocketEvents(){
        this.io.on("connection",( socket ) => socketController( socket, this.io)  );
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Express Server run on port ${this.port}`);
        });
    }

    async connectDb(){
        await dbConnection();  
    }

}

module.exports = Server;
