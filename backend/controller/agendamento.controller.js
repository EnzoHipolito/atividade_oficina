const Cliente = require('../models/Cliente')
const Agendamento = require('../models/Agendamento')
const Console = require('../models/Console')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.data || !valores.hora || !valores.tipoServico ||  !valores.codConsole || !valores.codCliente) {
        return res.status(400).json({ message: 'Todos os campos (data, hora, tipoServico, codConsole, codCliente) são obrigatórios!' })
    }

    try {
        const cliente = await Cliente.findByPk(valores.codCliente)

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente informado não existe!' })
        }

        const console = await Console.findByPk(valores.codConsole)
        if (!console) {
            return res.status(404).json({ message: 'Console informada não existe!' })
        }

        const novoAgendamento = await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento registrado com sucesso!', agendamento: novoAgendamento })
    } catch (err) {
        console.error('Erro ao criar agendamento:', err)
        return res.status(500).json({ message: 'Erro ao registrar agendamento!' })
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const agendamento = await Agendamento.findByPk(id)

        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado!' })
        }

        if (valores.codCliente) {
            const cliente = await Cliente.findByPk(valores.codCliente)
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente informado não existe!' })
            }
        }

        if (valores.codConsole) {
            const console = await Console.findByPk(valores.codConsole)
            if (!console) {
                return res.status(404).json({ message: 'Console informada não existe!' })
            }
        }

        await Agendamento.update(valores, { where: { codAgendamento: id } })
        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar agendamento:', err)
        return res.status(500).json({ message: 'Erro ao atualizar agendamento!' })
    }
}
const listar = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Cliente,
                    as: 'clienteAgendamento',
                    attributes: ['codCliente', 'nome', 'email']
                },
                {
                    model: Console,
                    as: 'consoleAgendamento',
                    attributes: ['codConsole', 'modelo', 'marca']
                }
            ]
        })

        return res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao listar agenda:', err)
        return res.status(500).json({ message: 'Erro ao listar agenda!' })
    }
}

module.exports = { cadastrar, atualizar, listar }