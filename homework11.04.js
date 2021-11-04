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

// 11/03에 배운것
// 1. members에서 carts로 member에서 cart로 바꾸기
// 2. create부터 delete까지 사이트에 접근하고 만들고 읽고 추가하고 지울 수 있도록 바꿔주기

const cartsCreate = function(form) {
  const cartNameObject = form['cart-name'];
  // cart-age를 지우고 name만 남겨놓기
  const cart = {
    name: cartNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(3, 'days').format('YYYY-MM-DD')
    // 홈페이지 메뉴에 있는 name,enter,expire를 추가해서 접근하게 한다.
  };
  // ajax('POST', 'http://localhost:3100/api/v1/carts', JSON.stringify(cart), successFunction);
  // axios.post('http://localhost:3100/api/v1/carts', cart).then(successFunction);
  axios.post('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json', cart).then(function() {
    // post 메소드를 사용하고, 나의 홈페이지 url를 접근하게 한다.
    cartNameObject.value = '';
    // 한번 싹 다 지운다.
    cartsRead();
    // 다시 추가한것까지 수정해서 다시 읽는다.
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
  axios.get('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json').then(function(response) {
    carts = response.data;
    // const membersLogical = response.data;
    // members = membersLogical.members;
    // 원래는 이런형식인데 한줄로 줄여줌.
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    // tbody로 바꿔준다.
    tagTbodyParent.innerHTML = '';
    // 한번 싹 다 자운다.
    const tagTrChild = document.getElementById('tag-tr-child');
    // tr로 바꾼다.
    let index = 0;
    // db에 접근하기 위해서 index(숫자)가 필요한데, 여기서 시작하기 전에 한번 불러준다.
    for (let key in carts) {
      // carts에 있는 오브젝트 내용을 key값으로 넘겨준다.
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      // 여기까지 html에 접근하기 위해서 두줄을 적어준다.
      const cartsNameObject = document.getElementsByName('carts-name')[index];
      cartsNameObject.innerHTML = carts[key].name;
      // name에 key값을 불러온다.
      const cartsEnterObject = document.getElementsByName('carts-enter')[index];
      cartsEnterObject.innerHTML = carts[key].enter;
      const cartsExpireObject = document.getElementsByName('carts-expire')[index];
      cartsExpireObject.value = carts[key].expire;
      cartsExpireObject.key = key;
      cartsExpireObject.index = index;
      const cartsDeleteObject = document.getElementsByName('carts-delete')[index];
      cartsDeleteObject.key = key;
      // db에 접근하기 위해서 하나씩 접근한다.
      index++;
      // index를 끝날 때마다 1씩 늘어나게 하기위해서 추가한다.
    }
    console.log('Readed', carts);
  });
};



const cartsDelete = function(key) {
  // const url = 'http://localhost:3100/api/v1/carts/' + key;
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  // url에 key값과 .json을 추가한다.

  // ajax('DELETE', url, undefined, cartsRead);
  axios.delete(url).then(cartsRead);
};


// const cartsUpdate = function(index, cart) {
//   carts[index] = cart;
//   cartsSet();
//   // window.location.reload();
//   return carts;
// };
const cartsUpdate = function(index, key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  const expire = document.getElementsByName('carts-expire')[index].value;
  //expire에 값을 업데이트 하기 위해서 carts-expire에 index에 접근하고, 값을 expire에 바뀐 값을 넘긴다.
  const cart = {
    expire: expire
  };
  // 오브젝트 형식으로 넘긴다.

  // ajax('PATCH', url, JSON.stringify(cart), cartsRead);
  axios.patch(url, cart).then(cartsRead);
};



const cartsSet = function() {
  const cartsSet = JSON.stringify(carts);
  sessionStorage.setItem('carts', cartsSet);
};

cartsRead();

