const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})
/*
try {
    sequelize.authenticate()
    console.log('Conectou com sucesso com o SEQUELIZE!!!')

} catch (error) {
    console.log('Não foi possível conectar ao banco: ', error)
}
*/

module.exports = sequelize