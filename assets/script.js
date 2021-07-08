const city = document.querySelector(".header__city-button");
let hash = location.hash.substring(1)
console.log(hash)

let headerList = document.querySelector('.navigation__list')
let goodsTitle = document.querySelector('.goods__title')

headerList.addEventListener('click', (e) => {
  goodsTitle.textContent = e.target.textContent
})
  city.textContent = localStorage.getItem("city") ? (city.textContent = localStorage.getItem("city")) : "Город";
  city.addEventListener("click", () => {
    const yourCity = prompt("Какой ваш город?");
    city.textContent = yourCity;
    localStorage.setItem("city", yourCity);
});



// Modal Window
const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");

const cartModalOpen = () => {
  cartOverlay.classList.add("cart-overlay-open");
  disableScroll();
};
const cartModalClose = () => {
  cartOverlay.classList.remove("cart-overlay-open");
  enableScroll();
};

//Block scroll
const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth

  document.body.dbScrollY = window.scrollY;

  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `
};
const enableScroll = () => {
  document.body.style.cssText = ''
  window.scroll({
    top: document.body.dbScrollY
  })
};

document.addEventListener("keyup", (e) => {
  if (e.code === "Escape") {
    cartModalClose()
    subheaderCart.blur()
  }
});



window.onscroll = () => {
  if(window.scrollY !== 0) {
    console.log('Scroll WAS')
  }
}

// Fetch 
const getData = async () => {
  const data = await fetch('db.json')
  if(data.ok) {
    return data.json()
  } else {
    throw new Error(`Ошибка!!!! ${data.status} ${data.statusText}` )
  }

}

const getGoods = (callback, value) => {
  getData()
    .then(data =>{
      if(value) {
        callback(data.filter(item => item.category === value))
      } else {
        callback(data)
      }
      
    })
    .catch(err => console.log(err))
}

subheaderCart.addEventListener("click", cartModalOpen);
cartOverlay.addEventListener("click", (e) => {
  if (
    e.target.matches(".cart__btn-close") ||
    e.target.matches(".cart-overlay")
  ) {
    cartModalClose();
  }
});

try {
  const goodsList = document.querySelector('.goods__list')
  if(!goodsList) {
    throw 'This is not a GoodsPage'
  }

  const createCard = ({id, preview, cost, brand, name, sizes}) => {

    const li = document.createElement('li')
    li.classList.add('goods__item')
    li.innerHTML = `
      <li class="goods__item">
          <article class="good">
              <a class="good__link-img" href="card-good.html#${id}">
                  <img class="good__img" src="goods-image/${preview}" alt="">
              </a>
              <div class="good__description">
                  <p class="good__price">${cost} &#8381;</p>
                  <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                  ${sizes
                    ? `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`
                    : ''}
                  <a class="good__link" href="card-good.html#${id}">Подробнее</a>
              </div>
          </article>
      </li>
    `

    return li
  } 

  const renderGoodsList = data => {
    goodsList.textContent = ''
    for (const item of data) {
     const card = createCard(item)
     goodsList.append(card)
    }
  }

 
  window.addEventListener('hashchange', () => {
    let title = document.querySelector('.navigation__link')
    hash = location.hash.substring(1)
    getGoods(renderGoodsList, hash)
  })

  getGoods(renderGoodsList, hash)

} catch (error) {
  console.log(error)
}
