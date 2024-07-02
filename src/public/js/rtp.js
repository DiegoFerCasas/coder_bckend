const socket = io()

socket.on("rtp_connected", (data) => {
    viewRtp(data)
})

function viewRtp(data) {
    const container = document.querySelector("#rtsViewContainer")
    let htmlView = ""
    data.forEach(element => {
        htmlView += `
        <li></li>
         <tr>
      <th scope="row">1</th>
      <td>${element.title}</td>
      <td>${element.stock}</td>
      <td>$${element.price}</td>
      <td>${element.category}</td>
    </tr>
        `
        container.innerHTML = htmlView
    });
}

let addProductForm = document.querySelector("#formRtp")
addProductForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    let title = addProductForm.elements.title.value
    let code = addProductForm.elements.code.value
    let price = addProductForm.elements.price.value
    let stock = addProductForm.elements.stock.value
    let category = addProductForm.elements.category.value
    let thumbnail = addProductForm.elements.thumbnail.value
    let description = addProductForm.elements.description.value
    let status = addProductForm.elements.status.checked

    socket.emit("addProduct",{
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    })
    addProductForm.reset()
})

