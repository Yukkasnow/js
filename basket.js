"use strict";

const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalSummEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});
const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);

});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalCount()
    basketTotalSummEl.textContent = getSummPrice().toFixed(2);
    postProductInBasket(id);
};
let summ = 0;
function getTotalCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
};
function getSummPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0);
};

function postNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
};
function postProductInBasket(productId) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        postNewProductInBasket(productId);
        return;
    }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

