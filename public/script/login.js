
window.onload = function() {
 loginPage();
};

function loginPage(){
this.forgotPasswordBtn = document.getElementById('noPassW');
this.the1stPage = document.getElementById('the1stPage');
this.forgotPass = document.getElementById('forgotPass');var loginBtn = document.getElementById('loginSubmit');
this.resetP = document.getElementById('sendBtn');
this.myForm = document.getElementById('login')


myForm.addEventListener('submit',login.bind(this));
//loginBtn.addEventListener('click',login.bind(this));
forgotPasswordBtn.addEventListener('click', toggleForgotPassword.bind(this));
resetP.addEventListener('click', rSend.bind(this));
}
myBase = firebase.auth();


function toggleForgotPassword(){
	this.the1stPage.setAttribute('hidden', 'true');
	this.forgotPass.removeAttribute('hidden');
}



function rSend(){
	let resPass = document.getElementById('resetPassword')[0];
	let errMsg = document.getElementById('errMsg1');
	console.log(resPass.value)
	if( resPass.checkValidity()){
		let rEmail = resPass.value;
		firebase.auth().sendPasswordResetEmail(rEmail).then(function() {
			errMsg.innerHTML = 'Password Sent to Email Address';
		}, function(error) {
			errMsg.innerHTML = 'Email address not found!!';
			console.log(error);
		});
	}
}

/*
function login(){
	var Email = document.getElementById('lEmail');
	var Passw = document.getElementById('lPassW');
	//if(Email.checkValidity() && Passw.checkValidity()){
		myBase.signInWithEmailAndPassword(Email.value, Passw.value).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if(errorCode){
		  	console.log(errorMessage);
		  }
		  else{
		  	alert('Susseccfully Logged IN')
		  }
		});
	//}
	//else{
	//	alert('invalid DATA');
	//}
}
*/

		
		function logOut(){
		firebase.auth().signOut().then(function() {
		}).catch(function(error){
		});
		}


		function login(){
			let Email = this.myForm[0];
			let passw = this.myForm[1];
			let errMsg = document.getElementById('errMsg');
			if(Email.checkValidity() && passw.checkValidity()){
		    firebase.auth().signInWithEmailAndPassword(Email.value, passw.value).then(function(user) {
		      user.getToken().then((token) => {
		        //createTokenCookie(token);
		        //document.cookie =   `token=token`;
		        let newDate = new Date();
 						newDate.setDate(newDate.getDate() + 30);
  					document.cookie = `token=${token}; expires=${newDate}; userUID=${user.uid};path=\/`;
		        console.log(token);
		        console.log('USER UID:    ' + user.uid)
		        //location.assign('/foods');
		      })
		    }).catch(function(error){
		   	  var errorCode = error.code;
				  var errorMessage = error.message;
				  console.log(errorMessage);
				  errMsg.innerHTML = errorMessage;				  
		    });
			}
		}
		
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				//User Logged IN
				var token = user.getToken();
				console.log(JSON.stringify(document.cookie));
				
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://localhost:3000/tokensign');
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function(){
					console.log('signed in as  ' + xhr.responseText);
				}
				xhr.send('token' +  token)
				location = '/userPage';
				
			}
			else{
				//User not Logged IN
			}
		})
/*
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		alert('Logged IN')
		//User Logged IN
	}
	else{
		//alert('Logged OUT')
		//User not Logged IN
	}
})
*/