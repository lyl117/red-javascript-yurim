let items;

const queryString = new URLSearchParams(window.location.search);
const orderByName = queryString.get('orderByName')||'name';
const orderByType = queryString.get('orderByType')||'desc';
const q = queryString.get('q') || '';
const name = document.getElementsByName('q')[0];
name.value = q;
name.focus();
document.getElementById(orderByName + '-' + orderByType).classList.add('active');


const itemsCreate = function(form) {
  const itemNameObject = form['item-name'];
  const item = {
    name: itemNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(3, 'days').format('YYYY-MM-DD')
  };
  axios.post('https://red-javascript-yurim-default-rtdb.firebaseio.com/items.json', item).then(function() {
    itemNameObject.value = '';
    itemsRead();
  });
};

const itemsRead = function() {
  axios.get('https://red-javascript-yurim-default-rtdb.firebaseio.com/items.json').then(function(response) {
    items = response.data;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    for (let key in items) {
      items[key].k = key
    }
    let _items = _.orderBy(items, orderByName, orderByType)
    let index = 0;
    let count = 0;
    for (let i in _items) {
      if (moment().format('YYYY-MM-DD') > _items[i].expire) {
        count++;
      }
      if (_items[i].name.indexOf(q) < 0) continue;
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      const itemsNameObject = document.getElementsByName('items-name')[index];
      itemsNameObject.innerHTML = _items[i].name;
      const itemsEnterObject = document.getElementsByName('items-enter')[index];
      itemsEnterObject.innerHTML = _items[i].enter;
      const itemsExpireObject = document.getElementsByName('items-expire')[index];
      itemsExpireObject.innerHTML = _items[i].expire;
      // itemsExpireObject.key = key;
      // itemsExpireObject.index = index;
      const itemsUpdateObject = document.getElementsByName('items-update')[index];
      itemsUpdateObject.key = _items[i].k;
      const itemsDeleteObject = document.getElementsByName('items-delete')[index];
      itemsDeleteObject.key = _items[i].k;
      // const itemsCheckboxObject = document.getElementsByName('items-checkbox')[index];
      // itemsCheckboxObject.key = key;
      index++;
    }
    // menu-items-counter
    const menuItemsCounter = document.getElementById('menu-items-counter');
    menuItemsCounter.innerHTML = count;
    console.log('Readed', _items);
  });
};

const itemsDelete = function(key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/items/' + key + '.json';
  axios.delete(url).then(itemsRead);
};

const itemsUpdate = function(key) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/items/' + key + '.json';
  const name = document.getElementsByName('item-name')[0].value;
  const enter = document.getElementsByName('item-enter')[0].value;
  const expire = document.getElementsByName('item-expire')[0].value;
  const item = {
    name: name,
    enter: enter,
    expire: expire
  };
  axios.patch(url, item).then(itemsRead);
  modalToggle();
};

const itemsUpdateModal = function(key) {
  const itemNameObject = document.getElementsByName('item-name')[0];
  itemNameObject.value = items[key].name;
  const itemEnterObject = document.getElementsByName('item-enter')[0];
  itemEnterObject.value = items[key].enter;
  const itemExpireObject = document.getElementsByName('item-expire')[0];
  itemExpireObject.value = items[key].expire;
  const itemUpdateObject = document.getElementsByName('item-update')[0];
  itemUpdateObject.key = key

  // // TODO: 데이터를 수정 후 DB에 저장
  // const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/items/' + key + '.json';
  // // const expire = document.getElementsByName('items-expire')[index].value;
  // const item = {
  //   name: name
  // };
  // debugger
  // axios.patch(url, item).then(itemsRead);
};

const itemsChange = function(event) {
  const url = 'https://red-javascript-yurim-default-rtdb.firebaseio.com/items/' + event.target.key + '.json';
  if (event.target.checked) {
    axios.patch(url, items[event.target.key]);
  } else {
    console.log('TODO: item 삭제')
    axios.delete(url);
  }
}

// itemsRead();
