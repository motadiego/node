const os = require('os')

console.log(os.cpus())

console.log(os.totalmem() / 1024 / 1024) // EM GB

console.log(os.freemem() / 1024 / 1024) // EM GB

console.log(os.homedir())

console.log(os.type())

console.log(os.hostname())

console.log(os.version())

