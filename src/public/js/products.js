function addToCart(productId){
    const idCart = '6660ce359f7114037f9aa2e3';
    fetch(`api/cart/${idCart}/products/${productId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(data=>{console.log(data)})
    .catch(error=>{console.log("error: "+ error)})
}