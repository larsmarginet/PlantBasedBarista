import './style.css';
import data from './assets/coffees.json';
{
  const init = () => {
    getMenu();
    checkIfOrdersEmpty();
    const coffeeItem = document.querySelectorAll('.price__button');
    coffeeItem.forEach($coffeeItem => $coffeeItem.addEventListener('click', handleCoffee));

    document.addEventListener('click', handleDelete);
  };

  const getMenu = () => {
    parse(data);
  };

  const parse = data => {
    const list = document.querySelector(`.prices__list`);
    let id = 1;
    data.coffees.forEach(coffee => {
      if (coffee.plantbased) {
        const listItem = list.appendChild(document.createElement(`li`));
        const $id = id ++;
        listItem.innerHTML = `
          <li class="price">
          <a class="price__button">
            <span class="price__button__wrapper">
              <span data-quantity="1" data-id="${$id}" class="price__button__name">${coffee.name}</span>
              <span class="price__button__amount">&euro; ${coffee.prices.medium}</span>
            </span>
            <span class="price__button__plus">+</span>
          </a>
        </li>`;
      }
    });
  };

  const ordersArr = [];

  const handleDelete = e => {
    // Info krijgen over het parent element (li) van de remove button.
    const $item = e.target;
    const remove = $item.className;

    //Doordat de eventlistener op het document zit moet je checken of het over de delete button gaat. Indien ja: voer dit uit. Indien nee: doe het niet.
    if (remove === 'remove') {
      const info = $item.parentNode;
      const $id = info.querySelector('.order__amount').dataset.id;
      const index = ordersArr.findIndex(i => i.id === $id);
      if (index > - 1) {
        ordersArr.splice(index, 1);
      }
      showOrderList();
    }
  };

  //Updaten van orderslist
  const showOrderList = () => {
    let totalOrder = 0;
    const $orders = document.querySelector('.orders');
    $orders.innerHTML = ``;
    console.log(ordersArr);
    ordersArr.forEach(item => {
      const listItem = $orders.appendChild(document.createElement(`li`));
      const total = item.quantity * item.price;
      totalOrder += total;
      listItem.innerHTML = `
      <li class="order">
      <span class="order__name">
        <span data-id="${item.id}" class="order__amount">${item.quantity} x</span> ${item.name}
      </span>
      <span class="order__price">&euro; ${total}</span>
      <button class="remove">
        x
      </button>
    </li>`;
    });
    checkIfOrdersEmpty();
    const $total = document.querySelector('.total__price span');
    $total.textContent = totalOrder;
  };


  const checkIfOrdersEmpty = () => {
    const $orderTotal = document.querySelector('.total');
    const $emptyState = document.querySelector('.emptystate');
    if (ordersArr.length <= 0) {
      $orderTotal.style.opacity = 0;
      $emptyState.innerHTML = `
      <div class="emptystate">
        <img srcset="./assets/img/coffee-maker.jpg 67w,
          ./assets/img/coffee-maker@2x.jpg 134w" sizes="67px" src="./assets/img/coffee-maker.jpg" alt="A coffee maker">

        <span class="emptystate__content">
          Please order something
          <span role="img" aria-label="Drunk emoji">
            🤪
          </span>
        </span>
      </div>`;
    } else {
      $emptyState.innerHTML = '';
      $orderTotal.style.opacity = 1;
      $orderTotal.innerHTML = `
      <span class="total__label">Total price</span>
      <span class="total__price">&euro; <span>0</span></span>`;
    }
  };


  const handleCoffee = e => {
    const $item = e.currentTarget;
    let $quantity = $item.querySelector('.price__button__name').dataset.quantity;
    const $id = $item.querySelector('.price__button__name').dataset.id;
    const $name = $item.querySelector('.price__button__name').textContent;
    const $price = $item.querySelector('.price__button__amount').textContent;
    const $priceNum = parseFloat($price.replace('€', '').replace('&euro;', ''));

    let coffeeObject = {
      id: $id,
      name: $name,
      price: $priceNum,
      quantity: $quantity
    };

    // Functie die checkt of er al een object is met hetzelfde id
    if (ordersArr.length > 0) {
      const index = ordersArr.findIndex(i => i.id === coffeeObject.id);

      //Nog niet? Dan voegt hij het object toe aan de array
      if (index === - 1) {
        ordersArr.push(coffeeObject);
      //Wel al? Het object met deze index wordt geupdate met een nieuwe quantity
      } else {
        $item.querySelector('.price__button__name').dataset.quantity = parseFloat($quantity) + 1;
        $quantity = $item.querySelector('.price__button__name').dataset.quantity;
        coffeeObject = {
          id: $id,
          name: $name,
          price: $priceNum,
          quantity: $quantity
        };
        ordersArr[index] = coffeeObject;
      }

    //Moest de array leeg zijn (geen bestelling) moet er sowieso een item gepusht worden
    } else {
      ordersArr.push(coffeeObject);
    }

    showOrderList();
  };

  init();
}
