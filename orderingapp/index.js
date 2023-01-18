import { Data } from './data.js'
console.log(Data)

const container = document.getElementById('container-items')
const itemstorage = document.getElementById('item-storage')
const total = document.getElementById('totalprice')
function render() {
    let items = ''

    Data.forEach(item => {
        items += `
        <div class="items">
            <img src="./images/${item.src}"/>
             <div class="description">
                <h1>${item.name}</h1>
                <p>${item.ingredients}</p>
                <h2>$${item.price}</h2>
             </div>
             <div class="testbtn">
             <button id="${item.id}">+</button>
             </div>
        </div>
    </div>
        `
    })
   
    container.innerHTML = items
}

render()

document.addEventListener('click', function(e) {
    console.log(typeof e.target.id)

   if(e.target.id == 3) {
    addItem(e.target.id)
   } else if(e.target.id == 1) {
    addItem(e.target.id)
   } else if(e.target.id == 2) {
    addItem(e.target.id)
   } else if(e.target.id === "Hamburger") {
    console.log("works")
    removeItem(e.target)
   } else if(e.target.id === "Pizza") {
    console.log("works")
    removeItem(e.target)
   } else if(e.target.id === "Beer") {
    console.log("works")
    removeItem(e.target)
   } 
    
})
let totalPrice = 0
function removeItem(e) {
  console.log(e.id)
  Data.forEach(item=> {
    if(item.name == e.id) {
        console.log("foundit")
        totalPrice -= item.price
    }
  })
  e.parentElement.parentElement.remove()
 
  total.innerHTML = `<p>$${totalPrice}</p>`
  if(totalPrice == 0) {
    orderbutton.disabled = true;
  }
  render()
}

const orderbutton = document.getElementById('checkoutbtn')
function addItem (e) {

        Data.forEach(item=> {
            if(item.id == e) {
                itemstorage.innerHTML +=
                `
                <div class="ordered-item">
                <div class="itemcontainer1">
                <p>${item.name}</p>
                <button class="removebtn" id=${item.name}>Remove</button>
                </div>
                <p>$${item.price}</p>
                
            </div>
                    `
                
                    totalPrice += item.price
            }
            
        })
        orderbutton.disabled = false
   total.innerHTML = `<p>$${totalPrice}</p>`
        render()
}

orderbutton.addEventListener('click', function() {
    document.getElementById('confirm-order').style.display = "flex"
})
//Modal Area
const closeModal = document.getElementById('modal-close-btn')

closeModal.addEventListener('click', function() {
    document.getElementById('confirm-order').style.display = "none"
})