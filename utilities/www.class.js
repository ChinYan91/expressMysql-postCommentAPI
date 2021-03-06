#!/usr/bin/env node
//var debug = require('debug')('backend:server');

class WWW { 
    static normalizePort(val) {
        let port = parseInt(val, 10);
        return (isNaN(port))? val : (port >= 0)? port : false;
    }
    
     static onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        
        var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    
     static onListening(server) {
        var addr = server.address();
        var bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
 
}

module.exports = WWW