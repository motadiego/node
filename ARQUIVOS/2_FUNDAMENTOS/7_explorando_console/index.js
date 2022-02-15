// mais de um valor no console
const a = 10
const b = 'Diego'
const c = [1,2,3]

console.log(a,b,c);

// contagem de impressões
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)


//variavel entre string
console.log('O nome é %s, e ele é programador', b)

//limpas o cache
setTimeout(() => {
    console.clear()
}, 2000)


