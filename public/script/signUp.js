
window.onload = function() {
 loginPage();
};

function loginPage(){
	console.log(config)
	this,regBtn = document.getElementById('register');
	this.regBtn.addEventListener('submit',signUp.bind(this));
}
myBase = firebase.auth();



function signUp(){
	let Email = this.regBtn[1];
	let Passw = this.regBtn[2];
	let errMsg  = document.getElementById('errMsg');
	errMsg.innerHTML = '';
	if(this.regBtn[2].value != this.regBtn[3].value){
		errMsg.innerHTML = 'The Password do not match';
	}
	else{
		if(Email.checkValidity() && Passw.checkValidity()){
			myBase.createUserWithEmailAndPassword(Email.value, Passw.value).catch(function(error) {
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
		alert('Logged IN')
		location = '/userPage';
		//User Logged IN
	}
	else{
		//alert('Logged OUT')
		//User not Logged IN
	}
})
