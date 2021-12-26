firebase.auth().onAuthStateChanged(function(firebaseUser) {
  console.log(firebaseUser);
  // console.log(firebaseUser.toString());
  if (firebaseUser) {
    console.log('로그인');
    // TODO: 로그인 li태그 찾기
    // document.getElementsByName('login-guest')[0].style.display = 'none';
    const loginMenu = document.getElementsByName('login-guest')[0];
    loginMenu.style.display = 'none';
    console.log(loginMenu);
    const loginLogin = document.getElementsByName('login-login')[0];
    loginLogin.style.display = 'none'; 
    const loginName = document.getElementsByName('login-name')[0];
    loginName.style.display = 'block';
    const loginLogout = document.getElementsByName('login-logout')[0];
    loginLogout.style.display = 'block';
    const loginDisplayName = document.getElementsByName('login-display-name')[0];
    if (firebaseUser.displayName) {
      loginDisplayName.innerHTML = firebaseUser.displayName;
    } else {
      loginDisplayName.innerHTML = '게스트';
    }
    // loginDisplayName.innerHTML = firebaseUser.displayName ? firebaseUser.displayName : '게스트';
    const menuCarts = document.getElementsByName('menu-carts')[0];
    menuCarts.style.display='block';
    const menuItems = document.getElementsByName('menu-items')[0];
    menuItems.style.display='block';
  } else {
    console.log('로그아웃')
    // TODO:
    const loginMenu = document.getElementsByName('login-guest')[0];
    loginMenu.style.display = 'block';
    console.log(loginMenu);
    const loginLogin = document.getElementsByName('login-login')[0];
    loginLogin.style.display = 'block';
    const loginName = document.getElementsByName('login-name')[0];
    loginName.style.display = 'none';
    const loginLogout = document.getElementsByName('login-logout')[0];
    loginLogout.style.display = 'none';
    const menuCarts = document.getElementsByName('menu-carts')[0];
    menuCarts.style.display='none';
    const menuItems = document.getElementsByName('menu-items')[0];
    menuItems.style.display='none';
  }
});

const googleLogin = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const googleLogout = function() {
  firebase.auth().signOut();
}

const emailSignup = function(form) {
  const email = 'geust@red-javascript-yurim.web.app'
  const password = 'geustgeust'
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.error(error);
    alert(error.message);
  });
};

const emailSignin = function(form) {
  const email = 'geust@red-javascript-yurim.web.app'
  const password = 'geustgeust'
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.error(error);
    alert(error.message);
  });
};
