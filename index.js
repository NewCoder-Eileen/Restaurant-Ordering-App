import menuArray from "/data.js"

const itemsSection = document.getElementById("items-section")
const checkoutSection = document.getElementById("checkout-section")
const orderedItems = document.getElementById("ordered-items")
const totalPriceEl = document.getElementById("total-price-el")
const completeOrderBtn = document.getElementById("complete-order-btn")
const payementModal = document.getElementById("payement-modal")
const payBtn = document.getElementById("pay-btn")
const nameInput = document.getElementById("name-input")
const orderComplete = document.getElementById("order-complete")
const completeMsg = document.getElementById("complete-msg")

let totalPrice = 0

document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        addItem(e.target.dataset.add)
    }
    if (e.target.classList.contains("remove-btn")) {
        const itemPrice = parseFloat(e.target.dataset.price)
        totalPrice -= itemPrice
        totalPriceEl.innerText = "$" + totalPrice
        e.target.closest('.ordered-item').remove()
    }
})

function addItem(addedItem) {
    const itemInfo = menuArray.filter(function(item){
        return addedItem === item.name.toLowerCase()
    })[0]
    orderedItems.innerHTML += `
        <div class="ordered-item">
            <p class="title">${itemInfo.name}</p>
            <button class="remove-btn" data-price="${itemInfo.price}">remove</button>
            <p class="price">$${itemInfo.price}</p>
        </div>
    `
    totalPrice += itemInfo.price
    totalPriceEl.innerText = "$" + totalPrice
}

completeOrderBtn.addEventListener('click', function(){
    payementModal.classList.remove("hidden")
})

payBtn.addEventListener('click', function(e) {
    e.preventDefault()
    const name = nameInput.value
    payementModal.classList.add("hidden")
    checkoutSection.classList.add("hidden")
    orderComplete.classList.remove("hidden")
    completeMsg.textContent = `Thanks, ${name}! Your order is on its way!`
    console.log(name)
})

menuArray.forEach(item => {
    itemsSection.innerHTML += `
            <div id="${item.id}" class="item">
                <div class="graphic">
                    <img src="images/${item.name}.png">
                </div>
                <div class="item-info">
                    <p class="title">${item.name}</p>
                    <p class="description">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <button class="add-btn" data-add="${item.name.toLowerCase()}">+</button>
            </div>
    `
})
