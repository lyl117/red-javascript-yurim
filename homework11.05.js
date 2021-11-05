
  // 1. 새로운 윈도우 만들기 (file- new window)
  // 2. npm install - firebase login - firebase init - (커리큘럼 참고) - firebase serve - firebase deploy
  // 3. markup (html&css - docs - red 들어가서 이미지와 코드 가져와서 새 윈도우에 복붙하기)
  // 4. 깃헙 연결(새로운 레파지토리 생성 - 새로운 이슈 생성 - 두번째 주소 복사 - 윈도우 터미널에 복붙 - github init 쳐서 초기화 - 원하는 코드를 친 후 커밋 진행)
  
  // members,member -> carts, cart로 바꾸기 
 let carts;

 const ajax = function(method,url,data,callback) {
   // method,url,data,callback까지 함수를 하나씩 아작스에 넘긴다.
   const xhrObject = new XMLHttpRequest();
   // new 뒤로 클래스를 연다.
   xhrObject.onreadystatechange = function(){
     if(xhrObject,readyState !==4) return;
     // 4가 아니면 리턴
     if(xhrObject.status === 200){
       // 200 = 정상통신한다.
       callback(xhrObject);
       // xhrObject 오브젝트 실행 
     }else{
       const error = {
         status: xhrObject.status,
         statusText: xhrObject.statusText,
         responseText: xhrObject.responseText
       }
       console.error(error);
     }
   };
   // 위에 if문 실행하거나 error 실행 

   xhrObject.open(method, url);
   xhrObject.setRequestHeader('content-type', 'application/json');
   xhrObject.send(data);
 };

 const cartsCreate = function(form) {
   const cartNameObject = form['cart-name'];
   const cart = {
     name: cartNameObject.value,
     enter: moment().format('YYYY-MM-DD'),
     exprire: moment().add(3, 'day').format('YYYY-MM-DD')
   };
   axios.post('https://red-javascript-yurim-default-rtdb.firebaseio.com/carts.json', cart).then(function() {
     cartNameObject.value ='';
     cartsRead();
   });
 };
