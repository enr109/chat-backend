const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = {
            uid,
        };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, ( err, token) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

const comprobarJWT = ( token = '') => {
    try {
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED);
        return [ true, uid];
    } catch (error) {
        return [ false, null];   
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}