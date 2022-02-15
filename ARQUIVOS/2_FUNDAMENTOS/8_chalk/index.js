const chalk = require('chalk')
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const nota = parseFloat(args['nota'])

if(nota >= 7){
    console.log(chalk.green('Parabéns, você está aprovado!!!!'))
}else{
    console.log(chalk.bgRed.black('Reprovado!!!'))
}