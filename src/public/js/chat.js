
const socket = io()
let user

let chatBox = document.querySelector("#chatBox")

Swal.fire({
    title: 'Ingrese su Email',
    input: 'text',
    text: 'Ingresa tu Email para identicarte en el chat',
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


socket.on('messageLogs', data => {
    let log = document.querySelector('#messagesLog')

    let messages = ''
    data.forEach(element => {
        console.log(element)
        messages += `${element.user} - Dice: ${element.message}</br>`

    });
    log.innerHTML = messages

})










