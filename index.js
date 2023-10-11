import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


let orderArr = []
const cardDetailsForm = document.getElementById('card-details-form')


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtnClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
    }
    if(e.target.id === 'purchase-btn'){
        handlePurchaseBtnClick()
    }
    if(e.target.id === 'modal-close-btn'){
        closeModal()
    }
})


cardDetailsForm.addEventListener('submit', function(e){
    //prevent page refresh on form submit
    e.preventDefault()
    
    //create form data object to access below
    const cardDetailsFromData = new FormData(cardDetailsForm)
    const name = cardDetailsFromData.get('name')

    //close modal and show thank you message
    document.getElementById('payment-modal').style.display = 'none'
    document.getElementById('your-order').innerHTML = ``
    document.getElementById('order-complete').innerHTML = `
        <div class="green-box">
            <p class="thanks">
            Thanks ${name}! Your order is on its way!
            </p>
        </div>`
})


function closeModal(){
    document.getElementById('payment-modal').style.display = 'none'
}


function handlePurchaseBtnClick(){
    document.getElementById('payment-modal').style.display = 'inline'
}


function handleRemoveBtnClick(orderItemId){
    orderArr = orderArr.filter(orderItem => orderItem.uuid !== orderItemId)

    if(orderArr.length < 1){
        document.getElementById('your-order').style.display = 'none'
    }
    renderOrder()
}


function handleAddBtnClick(menuItemId){
    
    const targetMenuObj = menuArray.filter(menuItem => menuItem.id == menuItemId)[0]
   
    orderArr.push({
        name: targetMenuObj.name,
        price: targetMenuObj.price,
        id: targetMenuObj.id,
        uuid: uuidv4()
    })
    
    if(orderArr.length > 0){
        document.getElementById('your-order').style.display = 'block'
    }
    renderOrder()
}


function getOrderDetailsHtml(){
    let orderDetailsHtml = ``

    orderArr.forEach(orderItem => {
        orderDetailsHtml += `
            <div class="order-details">
                <div class="order-item">
                    <p class="item-name">${orderItem.name}</p>
                    <button class="remove" data-remove="${orderItem.uuid}">Remove</button>
                    <p class="order-item-price">£${orderItem.price}</p>
                </div>
            </div>
            `
    })

    let yourOrderHtml = `
        <div class="container">
            <h3>Your Order</h3>
            ${orderDetailsHtml}
        </div>
        <div class="price container">
            <p class="total-price">Total price</p>
            <p class="order-item-price">£${orderArr.reduce((total, item) => total + item.price, 0)}</p>
        </div>
        <div class="btn-container">
            <button class="purchase-btn" id="purchase-btn">Complete order</button>
        </div>
        `
    return yourOrderHtml
}


function getMenuHtml(){
   let menuHtml = ``

    menuArray.forEach(menuItem => {
        menuHtml += `
            <div class="container menu-item">
                <div class="menu-left">
                    <div class="item-graphic">${menuItem.emoji}</div>
                    <div class="item-details">
                        <p class="item-name">${menuItem.name}</p>
                        <p class="item-ingredients">${menuItem.ingredients}</p>
                        <p class="item-price">£${menuItem.price}</p>
                    </div>
                </div>
                <div class="menu-right">
                    <button class="add-btn" id="add-btn" data-add="${menuItem.id}">&#43</button>
                </div>
            </div>
        `
    });
   return menuHtml
}


function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}


function renderOrder(){
    document.getElementById('your-order').innerHTML = getOrderDetailsHtml()
}


renderMenu()      