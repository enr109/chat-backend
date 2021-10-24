const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
    constructor( io ) {
        /* this.io = io; */

        this.socketEvents( io );
    }

    socketEvents( io ){
        io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );
            /* console.log('cliente conectado'); */
            // Validar el JWT

            if ( !valido ) {
                console.log('cliente no identificado');
                return socket.disconnect();
                
            }

            await usuarioConectado(uid);
            
            // Unir al usuario a una sala de socket.io
            socket.join( uid );

            // Escuchar cuando el cliente manda un mensaje 
            socket.on('mensaje-personal', async(payload) =>{
                const mensaje = await grabarMensaje(payload);
                io.to( payload.para).emit('mensaje-personal', mensaje);
                io.to( payload.de).emit('mensaje-personal', mensaje);
            });

            // Emitir todo los usuarios conectados
            io.emit( 'lista-usuarios', await getUsuarios())

            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                io.emit( 'lista-usuarios', await getUsuarios())
                console.log('cliente desconectado', uid);
            })
            
        })
    }
}


module.exports = Sockets;