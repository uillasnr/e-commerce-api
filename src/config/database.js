//configuraçaão do banco de dados

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'POSTGRES',
    database: 'e-commerce-api',
    define: {
        timespamps: true,
        underscored: true,
        underscoredAll: true,
    },
}