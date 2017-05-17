
window.onload = function() {
 loginPage();
};

function loginPage(){
	this,regBtn = document.getElementById('register');
	this.regBtn.addEventListener('submit',signUp.bind(this));
}
myBase = firebase.auth();



function signUp(){
	let Email = this.regBtn[1];
	let Passw = this.regBtn[2];
	let errMsg  = document.getElementById('errMsg');
	errMsg.innerHTML = '';
	sessionStorage.username = document.getElementById('username').value;
	if(this.regBtn[2].value != this.regBtn[3].value){
		errMsg.innerHTML = 'The Password do not match';
	}
	else{
		if(Email.checkValidity() && Passw.checkValidity()){
			myBase.createUserWithEmailAndPassword(Email.value, Passw.value).catch(function(error) {
				sessionStorage.username = username;
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if(errorMessage){
				errMsg.innerHTML = errorMessage;
			  }
			});
		}
		else{
			alert('invalid DATA');
		}
	}
}

firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		  //let userId = firebase.auth().currentUser;
  firebase.database().ref('users/' + user.uid).set({
	  'username': sessionStorage.username
	});
	localStorage.username = sessionStorage.username;
		//User Logged IN
		location = '/userPage';
	}
	else{
		//User not Logged IN
	}
})
