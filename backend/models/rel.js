const Cliente = require('./Cliente')
const Console = require('./Console')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Console, { 
    foreignKey: 'codCliente', 
    as: 'consoleCliente', 
    onDelete: 'CASCADE' 
})

Console.belongsTo(Cliente, {
    foreignKey: 'codCliente', 
    as: 'clienteConsole',
    allowNull: false
})

Console.hasOne(Agendamento, {
    foreignKey: 'codConsole',
    as: 'agendamentosConsole',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'codConsole', 
    as: 'consoleAgendamento',
    allowNull: false
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'codCliente',
    as: 'agendamentosCliente',
    onDelete: 'CASCADE'
})
Agendamento.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

module.exports = { Cliente, Console, Agendamento }