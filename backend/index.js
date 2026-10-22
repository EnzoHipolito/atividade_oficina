const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

const clienteController = require('./controller/cliente.controller')
const consoleController = require('./controller/console.controller')
const agendamentoController = require('./controller/agendamento.controller')
const authMiddleware = require('./middleware/auth.middleware')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(authMiddleware)

//Rota Raiz
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API PixelFix Rodando!' })
})

// Cliente
app.post('/cliente/cadastrar', clienteController.cadastrar)
app.get('/cliente/listar', clienteController.listar)
app.get('/cliente/consultar/:id', clienteController.consultar)
app.delete('/cliente/apagar', clienteController.apagar)
app.put('/cliente/atualizar', clienteController.atualizar)

// Console
app.post('/console/cadastrar', consoleController.cadastrarConsole)
app.get('/console/', consoleController.consultarConsole)

// Agendamento
app.post('/agendamento/cadastrar', agendamentoController.cadastrarAgendamento)
app.post('/agendamento/listar', agendamentoController.listar)
app.post('/agendamento/atualizar', agendamentoController.atualizar)

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })