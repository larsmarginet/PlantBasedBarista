import './style.css';
{
  const init = () => {
    console.log('test');
    getMenu();
  };

  const getMenu = async () => {
    const url = './assets/coffees.json';

    const response = await fetch(url);
    parse(await response.json());
  };

  const parse = coffees => {
    const list = document.querySelector(`.prices__list`);
    coffees.forEach(coffee => {
      const listItem = list.appendChild(document.createElement(`li`));
      listItem.innerHTML = `
        <li class="price">
        <a class="price__button">
          <span class="price__button__wrapper">
            <span class="price__button__name">${coffee.name}</span>
            <span class="price__button__amount">&euro; ${coffee.prices.medium}</span>
          </span>
          <span class="price__button__plus">+</span>
        </a>
      </li>`;
    });
  };
  init();
}
