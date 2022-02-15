const args = process.argv;

const nome = args[2].split("=")[1]
const idade = args[3].split("=")[1]

console.log(`O nome é ${nome} e a idade é ${idade} `)