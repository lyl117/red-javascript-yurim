let carts;

const queryString = new URLSearchParams(window.location.search);
const orderByName = queryString.get('orderByName') || 'name';
const orderByType = queryString.get('orderByType') || 'desc';

// if (orderByName === 'name' && orderByType === 'asc') {
//   document.getElementsByClassName('orderBy')[0].classList.add('active');
// } else if (orderByName === 'name' && orderByType === 'desc') {
//   document.getElementsByClassName('orderBy')[1].classList.add('active');
// }
// if (orderByName === 'enter' && orderByType === 'asc') {
//   document.getElementsByClassName('orderBy')[2].classList.add('active');
// } else if (orderByName === 'enter' && orderByType === 'desc') {
//   document.getElementsByClassName('orderBy')[3].classList.add('active');
// }
// if (orderByName === 'expire' && orderByType === 'asc') {
//   document.getElementsByClassName('orderBy')[4].classList.add('active');
// } else if (orderByName === 'expire' && orderByType === 'desc') {
//   document.getElementsByClassName('orderBy')[5].classList.add('active');
// }

document.getElementById(orderByName + '-' + orderByType).classList.add('active');

// const queryString = new URLSearchParams(window.location.search);
// const nameText = queryString.get('input-text');
// // const inputTextObjects = document.getElementsByName('input-text');
// // const inputTextObject = inputTextObjects[0];
// const inputTextObject = document.getElementsByName('input-text')[0]; 
// inputTextObject.value = nameText;
// inputTextObject.focus();
// inputTextObject.blur();

const cartsCreate = function(form) {
  const cartNameObject = form['cart-name'];
  const cart = {
    name: cartNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(3, 'days').format('YYYY-MM-DD')
  };
  axios.post('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json', cart).then(function() {
    cartNameObject.value = '';
    cartsRead();
  });
};

const cartsRead = function() {
  const promises = [];
  promises[0] = new Promise(function(resolve, reject) {
    axios.get('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json').then(function(response) {
      resolve(response.data);
    })
  });
  promises[1] = new Promise(function(resolve, reject) {
    axios.get('https://red-javascript-yurim-default-rtdb.firebaseio.com/items.json').then(function(response) {
      resolve(response.data);
    })
  });
  Promise.all(promises).then(function(result) {
    console.log(result);
    carts = result[0];
    const items = result[1];
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    for (let key in carts) {
      carts[key].k = key
    }
    let _carts = _.orderBy(carts, orderByName, orderByType)
    for (let index in _carts) {
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      const cartsNameObject = document.getElementsByName('carts-name')[index];
      cartsNameObject.innerHTML = _carts[index].name;
      const cartsEnterObject = document.getElementsByName('carts-enter')[index];
      cartsEnterObject.innerHTML = _carts[index].enter;
      const cartsExpireObject = document.getElementsByName('carts-expire')[index];
      cartsExpireObject.value = _carts[index].expire;
      cartsExpireObject.key = _carts[index].k;
      cartsExpireObject.index = index;
      const cartsDeleteObject = document.getElementsByName('carts-delete')[index];
      cartsDeleteObject.key = _carts[index].k;
      const cartsCheckboxObject = document.getElementsByName('carts-checkbox')[index];
      cartsCheckboxObject.key = _carts[index].k;
      cartsCheckboxObject.checked = items[_carts[index].k] ? true : false;
    }
    console.log('Readed', _carts);
  }).catch(function(error) {
    console.error(error);
  });
};

const cartsDelete = function(key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  axios.delete(url).then(cartsRead);
};

const cartsUpdate = function(index, key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  const expire = document.getElementsByName('carts-expire')[index].value;
  const cart = {
    expire: expire
  };
  axios.patch(url, cart).then(cartsRead);
};

const itemsChange = function(event) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/items/' + event.target.key + '.json';
  if (event.target.checked) {
    console.log('TODO: item 생성')
    console.log(event.target.key)
    console.log(carts)
    console.log(carts[event.target.key])
    console.log(event)
    console.log(url);
    axios.patch(url, carts[event.target.key]);
  } else {
    console.log('TODO: item 삭제')
    axios.delete(url);
  }
}

// cartsRead();
