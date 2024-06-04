function addToCart(productId){
    const idCart = '6657f332ffea4b8776d94258';
    fetch(`api/cart/${idCart}/products/${productId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(data=>{console.log(data)})
    .catch(error=>{console.log("error: "+ error)})
}