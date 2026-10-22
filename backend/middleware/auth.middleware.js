const cryptojs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

// Trecho separado do restante dos controllers, para melhor organização
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']
    
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' })
    }

    const bytes = cryptojs.AES.decrypt(token, CHAVE_SECRETA)
    const dadosDescriptografados = bytes.toString(cryptojs.enc.Utf8)

    
    const payload = JSON.parse(dadosDescriptografados)
    
    if(Date.now() > payload.expiraEm){
        return res.status(403).json({message: 'Token expirado'})
    }

    req.usuario = payload

    next()
}

module.exports = authMiddleware