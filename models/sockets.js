class Sockets {
    constructor( io ) {
        /* this.io = io; */

        this.socketEvents( io );
    }

    socketEvents( io ){
        io.on('connection', ( socket ) => {
            console.log('cliente conectado');
            // Validar el JWT


            socket.on('disconnet', () => {
                console.log('cliente desconectado');
            })
            
        })
    }
}


module.exports = Sockets;