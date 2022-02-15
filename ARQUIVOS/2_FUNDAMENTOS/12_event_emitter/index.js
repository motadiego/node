const EventEmmiter = require('events')
const eventEmmiter = new EventEmmiter()

eventEmmiter.on('disparar-evento', () =>{
    console.log('Evento disparado')
})

console.log('Antes')

eventEmmiter.emit('disparar-evento')

console.log('Depois')