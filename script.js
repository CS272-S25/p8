let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch('data/products.json')
  .then(r => r.json())
  .then(d => {
    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      let p = d.find(p => p.id == id);
      document.getElementById('product-name').textContent = p.name;
      document.getElementById('product-image').src = p.image;
      document.getElementById('product-price').textContent = `$${p.price}`;
      document.getElementById('product-desc').textContent = p.description;
    } else {
      document.getElementById('product-container').innerHTML = d.map(p => `
        <div>
          <img src="${p.image}" width="100">
          <p>${p.name} - $${p.price}</p>
          <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add</button>
          <a href="product.html?id=${p.id}">View</a>
        </div>
    `).join('');
  }
});

function addToCart(id, name, price) {
  let item = cart.find(i => i.id === id);
  item ? item.quantity++ : cart.push({ id, name, price, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById('cart-count').textContent = cart.reduce((t, i) => t + i.quantity, 0);

  const alert = document.getElementById('cart-alert');
  if (alert) {
    alert.classList.remove('d-none');
    setTimeout(() => alert.classList.add('d-none'), 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let c = document.getElementById('cart-count');
  if (c) c.textContent = cart.reduce((t, i) => t + i.quantity, 0);
});

