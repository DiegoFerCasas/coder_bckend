console.log ("hola")

const socket = io()

const  input = document.querySelector('#message')
const messagesList = document.querySelector('#listMensajes')

input.addEventListener('keyup', e=>{
if (e.key === 'Enter'){
    socket.emit('mensaje_cliente', input.value)
    input.value =''

}
})

socket.on ('messageServer',data=>{
    console.log (data)
})

// socket.emit('message' , 'string de data')

// socket.on('socket_individual', data=>{
//     console.log(data)
// })

// socket.on('para_todos_menos_el_actual', data=>{
//     console.log(data)
// })

// socket.on('evetnos_para_todos', data=>{
//     console.log(data)
// })