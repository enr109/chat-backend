class Sockets {
    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', ( socket ) => {
            // Validar el JWT
            
        })
    }
}