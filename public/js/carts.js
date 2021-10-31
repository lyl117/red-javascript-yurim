// const cartsGet = sessionStorage.getItem('carts');
// const cartsLogical = cartsGet || '[]';
// const carts = JSON.parse(cartsLogical);
let carts;

// const queryString = new URLSearchParams(window.location.search);
// const nameText = queryString.get('input-text');

// // const inputTextObjects = document.getElementsByName('input-text');
// // const inputTextObject = inputTextObjects[0];
// const inputTextObject = document.getElementsByName('input-text')[0]; 

// inputTextObject.value = nameText;

// const url = new URL(window.location);
// const queryString = url.searchParams;
// const nameText = queryString.get('cart-name');
// const nameText = queryString.get('cart-age');
const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('cart-name','cart-age');
const inputTextObject = document.getElementsByName('cart-name');
const inputTextObjects = document.getElementsByName('cart-age');
const inputText = inputTextObject[0];


// const inputHiddens = queryString.getAll('input-hidden');
// const inputHidden = inputHiddens[0];

// inputTextObject.focus();
// inputTextObject.blur();

// 문제 풀기

// const cartsSubmit = function(form) {
//   const inputTextObject = form['input-text'];
//   try {
//     const evalReturn = eval(inputTextObject.value);
//     console.log(evalReturn);
//   } catch(error) {
//     console.error(error);
//     alert(error);
//     return false;
//   }
// }

// const cartsCreate = function(cart) {
//   carts.push(cart);
//   cartsSet();
//   // window.location.reload();
//   return carts;
// };

// const cartsCreate = function(form) {
//   const cartNameObject = form['cart-name'];
//   const cartAgeObject = form['cart-age'];
//   carts.push({
//     name: cartNameObject.value,
//     age: cartAgeObject.value
//   });
//   cartNameObject.value = '';
//   cartAgeObject.value = '';
//   cartsSet();
//   return cartsRead();
  
// };

const ajax = function(method, url, data, callback) {
  const xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState !== 4) return;
    if (xhrObject.status === 200) {
      callback(xhrObject);
    } else {
      const error = {
        status: xhrObject.status,
        statusText: xhrObject.statusText,
        responseText: xhrObject.responseText
      }
      console.error(error);
    }
  };
  xhrObject.open(method, url);
  xhrObject.setRequestHeader('Content-Type', 'application/json');
  xhrObject.send(data);
};


const cartsCreate = function(form) {
  const cartNameObject = form['cart-name'];
  const cart = {
    name: cartNameObject.value
  };
  // ajax('POST', 'http://localhost:3100/api/v1/carts', JSON.stringify(cart), successFunction);
  // axios.post('http://localhost:3100/api/v1/carts', cart).then(successFunction);
  axios.post('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json', cart).then(function() {
    cartNameObject.value = '';
    cartsRead();
  });
};


const cartsRead = function() {
  // const successFunction = function(response) {
  //   const cartsLogical = response.data;
  //   carts = cartsLogical.carts;
  //   const tagDivParent = document.getElementById('tag-div-parent');
  //   tagDivParent.innerHTML = '';
  //   const tagDivChild = document.getElementById('tag-div-child');
  //   for (let index in carts) {
  //     const newDivChild = tagDivChild.cloneNode(true);
  //     tagDivParent.appendChild(newDivChild);
  //     const cartsNameObject = document.getElementsByName('carts-name')[index];
  //     const cartsAgeObject = document.getElementsByName('carts-age')[index];
  //     const cartsUpdateObject = document.getElementsByName('carts-update')[index];
  //     const cartsDeleteObject = document.getElementsByName('carts-delete')[index];
  //     cartsNameObject.value = carts[index].name;
  //     cartsAgeObject.value = carts[index].age;
  //     cartsUpdateObject.index = index;
  //     cartsDeleteObject.index = index;
  //   }
  //   console.log('Readed', carts);
  // };
  // ajax('GET', 'http://localhost:3100/api/v1/carts', undefined, successFunction);
  axios.get('http://localhost:3100/api/v1/carts').then(function(response) {
    const cartsLogical = response.data;
    carts = cartsLogical.carts;
    const tagDivParent = document.getElementById('tag-div-parent');
    tagDivParent.innerHTML = '';
    const tagDivChild = document.getElementById('tag-div-child');
    for (let index in carts) {
      const newDivChild = tagDivChild.cloneNode(true);
      tagDivParent.appendChild(newDivChild);
      const cartsNameObject = document.getElementsByName('carts-name')[index];
      const cartsAgeObject = document.getElementsByName('carts-age')[index];
      const cartsUpdateObject = document.getElementsByName('carts-update')[index];
      const cartsDeleteObject = document.getElementsByName('carts-delete')[index];
      cartsNameObject.value = carts[index].name;
      cartsAgeObject.value = carts[index].age;
      cartsUpdateObject.index = index;
      cartsDeleteObject.index = index;
    }
    console.log('Readed', carts);
  });
};



const cartsDelete = function(index) {
  const url = 'http://localhost:3100/api/v1/carts/' + index;
  // ajax('DELETE', url, undefined, cartsRead);
  axios.delete(url).then(cartsRead);
};


// const cartsUpdate = function(index, cart) {
//   carts[index] = cart;
//   cartsSet();
//   // window.location.reload();
//   return carts;
// };
const cartsUpdate = function(index) {
  const url = 'http://localhost:3100/api/v1/carts/' + index;
  const name = document.getElementsByName('carts-name')[index].value;
  const age = document.getElementsByName('carts-age')[index].value;
  const cart = {
    name: name,
    age: age
  };
  // ajax('PATCH', url, JSON.stringify(cart), cartsRead);
  axios.patch(url, cart).then(cartsRead);
};



const cartsSet = function() {
  const cartsSet = JSON.stringify(carts);
  sessionStorage.setItem('carts', cartsSet);
};

cartsRead();

