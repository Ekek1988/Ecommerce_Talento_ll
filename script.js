const productosContainer = document.getElementById("productos");
const carritoSection = document.getElementById("carrito");
const verCarritoBtn = document.getElementById("ver-carrito");
const carritoItems = document.getElementById("carrito-items");
const carritoTotal = document.getElementById("carrito-total");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const carritoContador = document.getElementById("carrito-contador");

let carrito = [];

const API_URL = "https://fakestoreapi.com/products";

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  mostrarProductos(productos);
}

function mostrarProductos(productos) {
  productosContainer.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>$${producto.price}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    div.querySelector("button").addEventListener("click", () => agregarAlCarrito(producto));
    productosContainer.appendChild(div);
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - $${item.price}`;
    carritoItems.appendChild(li);
    total += item.price;
  });

  carritoTotal.textContent = total.toFixed(2);
  carritoContador.textContent = carrito.length;
}

verCarritoBtn.addEventListener("click", () => {
  carritoSection.classList.toggle("oculto");
});

vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

cargarProductos();
