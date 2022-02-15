// const nao aceita alterar valor
const x = 10

try {
    x = '2'
} catch (error) {
    console.log(`Erro: ${error}`)
}