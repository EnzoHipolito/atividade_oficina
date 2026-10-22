const Console = require('../models/Console')

const cadastrarConsole = async (req, res) => {
    const valores = req.body
    try {
        const novoConsole = await Console.create(valores)

        return res.status(201).json({ message: 'Console cadastrado!', console: novoConsole })
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Erro ao cadastrar console!' })
    }
}

const consultarConsole = async (req, res) => {
    const id = req.params.id

    try {
        const console = Console.findByPk(id)

        if (!console) {
            return res.status(404).json({ message: 'Console não existe!' })
        }

        return res.status(200).json({ console })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Função de consulta não implementada!' })
    }
}

module.exports = { cadastrarConsole, consultarConsole }