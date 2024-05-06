
const socket = io()
let user

let chatBox = document.querySelector("#chatBox")

Swal.fire({
    title: 'Igrese su nombre',
    input: 'text',
    text: 'Ingresa tu usuario para identicarte en el chat',
    inputValidator: value => {
        return !value && 'Pon el usuario para continuar'
    },
    allowOutsideClick: false,
    icon: 'success',
})
    .then(result => {
        user = result.value
    })

chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('mensaje_cliente', { user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})
const messagesList = document.querySelector('#listMensajes')


socket.on('messageServer', data => {
    console.log(data)
})










