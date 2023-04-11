// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const UrlId = this.window.location.search;
  try {
    const response = await this.fetch(`${singleProductUrl}${UrlId}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      const { id, fields } = product;
      productID = id;
      const { colors, company, description, name, price } = fields;
      const img = fields.image[0].thumbnails.large.url;

      this.document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = img;
      titleDOM.textContent = `${name}`;
      companyDOM.textContent = `${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = `${description}`;
      colors.forEach((color) => {
        const span = this.document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
      <div>
      <h3 class="error">sorry, something went wrong </h3>
      <a href="index.html" class="btn">back home</a>
      </div>
      `;
    }
  } catch (err) {
    console.log(err);
  }

  loading.style.display = 'none';
});

cartBtn.addEventListener('click', function () {
  addToCart(productID);
});
