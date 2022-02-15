const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
    {name: "nome", message: "Qual o seu nome"},
    {name: "idade",message: "Qual a sua idade"},
])
.then(respostas => {
   
    const idade = parseInt(respostas.idade);

    if(!respostas.nome ||!idade){
        throw new Error("O nome e a idade são obrigatórios.");     
    }    

    if(isNaN(idade) || idade == 0){
        throw new Error("A idade tem que ser um número maior que zero.");
    }

    console.log(chalk.bgYellow.black(`O nome é ${respostas.nome}, e a idade é ${respostas.idade}`)) 
})
.catch((error) => console.log("Mensagem de erro :" + chalk.bgRed.black(error.message)))