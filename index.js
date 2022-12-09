import menuArray from '/data.js'

let orderArray = []


document.addEventListener('click', function(e){
    if(e.target.dataset.plus){
        handlePlusClick(e.target.dataset.plus)
        
    } else if(e.target.dataset.minus){
        handleMinusClick(e.target.dataset.minus)
        
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
        
    } else if (e.target.id === "check-btn"){
      document.getElementById('payment-form-container').style.display = 'block'
      
    } else if (e.target.id === "close-btn"){
        document.getElementById('payment-form-container').style.display = 'none'
    }
})
  
document.getElementById('pay-btn').addEventListener('submit', (e) =>{
        e.preventDefault()
        const paymentData = new FormData(document.getElementById('payment-form'))
   })

function handlePlusClick(id){
    renderObjects(getObjects(id))
}

function handleMinusClick(targetId){
    orderArray = orderArray.filter((product) => {
        return targetId == product.id ? 
        {...product, numberOfPieces: product.numberOfPieces--} : 
        product
    }).filter(product => product.numberOfPieces > 0)
    
    renderObjects(orderArray)
}

function handleRemoveClick(id){
    orderArray = orderArray.filter(product => product.id != id)
    renderObjects(orderArray)
}

function renderObjects(productArray){
    let totalPrice = 0
    document.getElementById('order-list').innerHTML = ''
    
    productArray.forEach(product => {
        
        totalPrice += product.price * product.numberOfPieces
        document.getElementById('order-list').innerHTML += 
            `<div class="order-container">
                <h3 class="order-product-name">${product.name}</h3>
                <button data-remove=${product.id} class="remove-btn">remove</button>
                <button data-minus="${product.id}" class="btn minus-btn">-</button>
                <span class="order-pieces">${product.numberOfPieces} x</span>
                <span class="order-price">$ ${product.price}</span>
                <span class="order-total">= $ ${product.numberOfPieces * product.price}</span>
            </div>`
    })
    document.getElementById('order-list').innerHTML ? 
    document.getElementById('check-btn').disabled = false :
    document.getElementById('check-btn').disabled = true
    
    document.getElementById('check-price').innerHTML = `$ ${totalPrice}`
}

function getObjects(id){
    const object = menuArray.filter(product => product.id == id)[0]
    if(orderArray.find(({id}) => object.id === id)){
        (orderArray.find(({id}) => object.id === id)).numberOfPieces++
    } else {
        object.numberOfPieces = 1
        orderArray.push(object)
    }
    return orderArray
}
    
function renderProducts(){
    const productHtml = menuArray.map(product => 
            `<div class="product-container" id="${product.name}-container">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-desc">${product.ingredients}</p>
                    <p class="product-price">$${product.price}</p>
                </div> 
                <button data-plus="${product.id}" class="btn">+</button>
            </div>`
    ).join('')
    return productHtml
}

document.getElementById('product-list').innerHTML = renderProducts()

