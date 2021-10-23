const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
    constructor( io ) {
        /* this.io = io; */

        this.socketEvents( io );
    }

    socketEvents( io ){
        io.on('connection', ( socket ) => {

            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );
            /* console.log('cliente conectado'); */
            // Validar el JWT

            if ( !valido ) {
                console.log('cliente no identificado');
                return socket.disconnect();
                
            }

            console.log('Cliente conectado', uid);

            socket.on('disconnet', () => {
                console.log('cliente desconectado', uid);
            })
            
        })
    }
}


module.exports = Sockets;