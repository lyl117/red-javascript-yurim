
const cartsRead = function() {
  axios.get('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json').then(function(response) {
    carts = response.data;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    // getElemnetById = element 객체 반환 하거나 주어진 id와 일치하는 dom 요소가 없으면 null을 return 함.
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    let index = 0;
    for(let key in carts) {
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      const cartsNameObject = document.getElementsByName('carts-name')[index];
      cartsNameObject.innerHTML = carts[key].name;
      const cartsEnterObject = document.getElementsByName('carts-enter')[index];
      cartsEnterObject.value = carts[key].enter;
      const cartsExpireObject = documnet.getElementsByName('carts-expire')[index];
      cartsExpireObject.value = carts[key].expire;
      cartsExpireObject.key = key;
      cartsExpireObject.index = index;
      const cartsDeleteObject = document.getElementsByName('carts-delete')[index];
      cartsDeleteObject.key = key;
      index++;
    }
    console.log('Readed', carts);
  });
};


const cartsDelete = function(key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  axios.delete(url).then(cartsRead);
};

const cartsUpdate = function(index, key){
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/carts/' + key + '.json';
  const expire = document.getElementsByName('carts- expire')[index].value;
  const cart = {
    expire: expire
  };
};

const cartsSet = function() {
  const cartsSet = JSON.stringify(carts);
  sessionStorage.setItem('carts', cartsSet);
};
// 여기까지 선언부 

cartsRead();
