const city = document.querySelector(".header__city-button");

city.textContent = localStorage.getItem("city")
  ? (city.textContent = localStorage.getItem("city"))
  : "Город";

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


subheaderCart.addEventListener("click", cartModalOpen);
cartOverlay.addEventListener("click", (e) => {
  console.log(e.target.matches);
  if (
    e.target.matches(".cart__btn-close") ||
    e.target.matches(".cart-overlay")
  ) {
    cartModalClose();
  }
});

