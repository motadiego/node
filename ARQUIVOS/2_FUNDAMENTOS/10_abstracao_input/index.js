const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: "nota1",
        message: "Qual a nota 1 ?",
    },
    {
        name: "nota2",
        message: "Qual a nota 2 ?",
    },
])
.then((respostas) =>{
    try {
        const media = (parseFloat(respostas.nota1) + parseFloat(respostas.nota2)) / 2;
        
        if(isNaN(media)){
            throw new Error();
        }
        
        console.log(`A média é ${media}`);
    } catch (error) {
        console.log('As notas não podem ser letras');
    }
})
.catch((erro) => console.log("Erro :" + erro))