const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual a sua linguagem favorita ? ', (language) => {
    if(language === 'HTML'){
        console.log('Isso nem é linguagem')
    }else{
        console.log(`A minha linguagem favorita é ${language}`)
    }
    readline.close()
})