let cart = JSON.parse(localStorage.getItem("chocobarCart")) || [];

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("chocobarCart", JSON.stringify(cart));
  alert(`${name} added to your cart!`);
}

function renderCartPage() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  if (!cartList) return;

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<p style='text-align:center; color:#555;'>Your cart is currently empty. <a href='products.html' style='color:#6b3e26;'>Browse chocolates</a>.</p>";
    totalDisplay.textContent = "€0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div class="item-details">
        <strong>${item.name}</strong>
        <span>€${item.price.toFixed(2)} each</span>
      </div>
      <div class="item-controls">
        <button type="button" class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
        <span class="qty-num">${item.quantity}</span>
        <button type="button" class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
        <button type="button" class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartList.appendChild(row);
  });

  totalDisplay.textContent = `€${total.toFixed(2)}`;
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("chocobarCart", JSON.stringify(cart));
  renderCartPage();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("chocobarCart", JSON.stringify(cart));
  renderCartPage();
}

function completeOrder(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Please add at least one chocolate to your cart first!");
    return;
  }

  const customerName = document.getElementById("username").value;
  localStorage.setItem("lastCustomerName", customerName);
  localStorage.removeItem("chocobarCart");
  window.location.href = "order_complete.html";
}

document.addEventListener("DOMContentLoaded", renderCartPage);
