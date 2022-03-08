// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')

operation()

function operation(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consultar saldo',
                    'Depositar',
                    'Sacar',
                    'Transferência',
                    'Sair'
                ]
            }
        ]).then((answer) =>{
            const action = answer['action'] 
            if(action === 'Criar conta'){
               createAccount();     
            }else if(action === 'Consultar saldo'){
                getAccountBalance();
            }else if(action === 'Depositar'){
                deposit();
            }else if(action === 'Sacar'){
                withdraw();    
            }else if(action === 'Transferência'){
                transfer();
            }else if(action === 'Sair'){
               console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
               process.exit()     
            }
        })
          .catch((err) => console.log(err))   
}

// create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}


function buildAccount(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome para a sua conta'
            }
        ]).then((answer) =>{
            const accountName = answer['accountName'] 
            
            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }

            if(fs.existsSync(`accounts/${accountName}.json`)){
                console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
                buildAccount()  
                return  
            }
            
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance": 0}',
                function (err) {
                    console.log(err)
                },
            )   
            
            console.log(chalk.green('Parabéns, sua conta foi criada!'))
            operation()
        })
          .catch((err) => console.log(err)) 
}

// add an amount to user account
function deposit(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta'
            }
        ]).then((answer) =>{
            const accountName = answer['accountName'] 

            // verify id account exists
            if(!checkAccount(accountName)){
               return deposit()    
            }

            inquirer
               .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja depositar ?'
                    }
               ]).then((answer)=>{
                    const amount = answer['amount'] 
                    
                    // add an amount
                    addAmount(accountName, amount)

               })
               .catch((err) => console.log(err))
        })
          .catch((err) => console.log(err)) 
}


function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outra conta!'))
        return false
    }

    return true
}


function addAmount(accountName , amount){
    const accountData = getAccount(accountName)
    
    if(!amount || amount < 0){
        console.log(chalk.bgRed.black('Valor inválido, tente novamente!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance) 

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    ) 

    console.log(chalk.bgGreen.black(`Foi depositado o valor de R$ ${amount}`))
    operation()
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}


function getAccountBalance(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta'
            }
        ]).then((answer) =>{
            const accountName = answer['accountName'] 

            if(!checkAccount(accountName)){
                return getAccountBalance()    
            }
             
            const accountData = getAccount(accountName)

            console.log(chalk.bgBlue.black(`O saldo da conta é ${accountData.balance}`))
            
            operation()
        })
        .catch((err) => console.log(err)) 
}


function withdraw(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta'
            }
        ]).then((answer) =>{
            const accountName = answer['accountName'] 

            // verify id account exists
            if(!checkAccount(accountName)){
               return withdraw()    
            }

            inquirer
               .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja sacar?'
                    }
               ]).then((answer)=>{
                    const amount = answer['amount'] 
                    
                    // remove an amount
                    removeAmount(accountName, amount)

               })
               .catch((err) => console.log(err))
        })
          .catch((err) => console.log(err)) 
}


function removeAmount(accountName , amount){
    const accountData = getAccount(accountName)
    
    if(!amount || amount < 0){
        console.log(chalk.bgRed.black('Valor inválido, tente novamente!'))
        return withdraw()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Saldo insuficiente!'))
        return withdraw()
    }


    accountData.balance =  parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    ) 

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`))
    operation()
}



function transfer(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta'
            }
        ]).then((answer) =>{
            const accountName = answer['accountName'] 

            // verify id account exists
            if(!checkAccount(accountName)){
               return transfer()    
            }

            inquirer
               .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja transferir?'
                    }
               ]).then((answer)=>{
                    const amount = answer['amount'] 
                   
                    transferAmount(accountName, amount)
                    
               })
               .catch((err) => console.log(err))
        })
          .catch((err) => console.log(err)) 
}




function transferAmount(accountName, amount){
    
    const accountData = getAccount(accountName)

    if(!amount || amount < 0){
        console.log(chalk.bgRed.black('Valor inválido, tente novamente!'))
        return transfer()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Saldo insuficiente'))
        return transfer()
    }
    
    inquirer
        .prompt([
            {
                name: 'accountDestiny',
                message: 'Digite o nome da conta destino'
            }
        ]).then((answer) =>{
            const accountDestiny = answer['accountDestiny'] 

            // verify id account exists
            if(!checkAccount(accountDestiny)){
                return transferAmount(accountName, amount)    
            }

            // remove amount from origin account
            removeAmountTransfer(accountName, amount)

            //add amount to destination account
            addAmountTransfer(accountDestiny,amount)

            console.log(chalk.green('Transferência realizada com sucesso!'))
            operation()

        })
        .catch((err) => console.log(err)) 
}


function removeAmountTransfer(accountName , amount){
    const accountData = getAccount(accountName)
    
    accountData.balance =  parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    ) 
}


function addAmountTransfer(accountName , amount){
    const accountData = getAccount(accountName)
    
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance) 

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    ) 
}