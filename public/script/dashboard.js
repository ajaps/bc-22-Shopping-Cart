
window.onload = function() {
 myPage();
 
};

function myPage(){
	let signOff = document.getElementById('signOff');
	signOff.addEventListener('click', logOut.bind(this));
}


//Check if firebase is authenticated
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
    
    //Load Cart From Database
    loadDB();

    //check if Username is save in Local storage
    if(localStorage.username){
      document.getElementById('username').innerHTML = localStorage.username;
    }
    else{
      getUserName();
      document.getElementById('username').innerHTML = localStorage.username;
    }
	}
	else{
		location = '/login';
	}
})



function logOut(){
	firebase.auth().signOut().then(function() {
	alert('logged Out');
  //location='/login'
	}).catch(function(error){
	});
}

const allItems = {'Luella Dress':388, 'Eggs':900, 'Hamburger':200, 'Dognut':38, 'Constance Dress':348, 'Cookies':5,
'Flavoured Dognut':51, 'Spagetti':120, 'Pounded yam':200, 'Ofada Rice':150, 'Nigerian Jollof Rice':139, 'Flavoured Jollof Rice':257, 'Men Briefs RED':70, 'Men Briefs Black and White':73,
'Female pant':15, 'Female Smiley Face Pant':17, 'Blue Female Pant':13, 'White Female Bra and pant':11, 'Blue Female Bra and Pant':20, 'Pink high Heel shoe':155, 'Brown Men Causal Shoe':202,
'Lilac men Footware':350, '32 inch Plasma TV':2000, '62 inch Plasma TV':5005, 'Samsung Galaxy S8':435, 'Iphone 7':500, 'Cooking Pot':199}


let total = 0;
//Allow elemetn to recieve other dragged element(s)
function allowDrop(ev) {
  ev.preventDefault();
}

//Appends data on item drag Product
function dragItemToCart(ev) {
    //ev.dataTransfer.setData("text", ev.target.getAttribute('id'));
    ev.dataTransfer.setData("text", ev.target.getAttribute('value'));
}

function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    let totalCost = Number(document.getElementById('totalCost').innerHTML);
    
    //Play Add notification sound
    //var audio = new Audio('sound/drop.m4a');
    var audio = new Audio('sound/show.mp3');
    audio.play();
    let cartTable = document.getElementById('tableBody');
    //let cartTable = document.getElementById('tableCart');

    let newItem = document.getElementById(data)

    if(newItem)
    { 
      //Ensures only items from the cart cannot be draaged and dropped to increase the number
      if(newItem.firstChild.innerHTML)
      {
        // Increment quantity by 1
        let itemQty = Number(newItem.firstChild.innerHTML) + 1;
        newItem.firstChild.innerHTML = itemQty;

        //Calculates and sets cost of total items in the cart
        totalCost += allItems[data];
        document.getElementById('totalCost').innerHTML = totalCost;

        //Write to Firebase Database
        writeToDB(data, itemQty, allItems[data]);
      }
    }
    else
    {
      //Checks if the item dragged is valid
      if(allItems[data] ){
        //Create new item in the cart
        let tr = document.createElement('tr');
		//let tr = cartTable.insertRow(0);
        tr.setAttribute('id',data);
        tr.setAttribute('draggable', 'true');
        //tr.setAttribute('value', data);
        tr.setAttribute('ondragstart', "dragItemFromCart(event)");
		//tr.addEventListener('dragstart',dragItemFromCart(event));
        
        //set quantity TD
        let td = document.createElement('td');
        td.setAttribute('id','qty');
        //td.className = 'tableHead1';
        td.innerHTML = 1;
        //td.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td);

        //set item name TD
        let td1 = document.createElement('td');
        td1.setAttribute('id','itemName');
        //td.className = 'tableHead2';
        td1.innerHTML = data;
        //td1.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td1);

        //set Price ID
        let td2 = document.createElement('td');
        td2.setAttribute('id','price');
        td2.innerHTML = allItems[data];
        //td2.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td2);
        cartTable.appendChild(tr)

        //Calculates Cost of item in the cart
        totalCost += allItems[data];
        document.getElementById('totalCost').innerHTML = totalCost;

        //Write to Firebase Database
        writeToDB(data, '1', allItems[data]);
      }
    }
}


//Appends data on item drag from Cart
function dragItemFromCart(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('id'));
}

function removeItem(ev) {

    //Play delete notification sound
    var audio = new Audio('sound/recycle.wav');
    audio.play();   

    ev.preventDefault();
    let totalCost;
    let data = ev.dataTransfer.getData("text");
    let newItem = document.getElementById(data);

    //Get the quantity value
    let itemQty = Number(newItem.firstChild.innerHTML);

     

    //Check if qty is  equal to 1 - remove else decrement by 1
    if(itemQty>1){
      itemQty-=1;
      newItem.firstChild.innerHTML = itemQty;
      totalCost = Number(document.getElementById('totalCost').innerHTML);
      //subtract from total cost
      totalCost =totalCost -  allItems[data];
      document.getElementById('totalCost').innerHTML = totalCost;
      
      //Write to Firebase Database
        writeToDB(data, itemQty, allItems[data]);
    }
    else{
      totalCost = Number(document.getElementById('totalCost').innerHTML);
      totalCost -= allItems[data];
      //subtract from total cost      
      document.getElementById('totalCost').innerHTML = totalCost;
      let row = document.getElementById(data);
      row.parentNode.removeChild(row);

      //Delete item from Firebase Database
        deleteFromDB(data); 
    }
    
    console.log('im here oooo')
  }

function writeToDB(item, qty, price){
  let userId = firebase.auth().currentUser;
  console.log(userId);
  firebase.database().ref('users/' + userId.uid + '/products/' + item).set({
	  'qty': qty,
	  'price': price
	});
}

function deleteFromDB(item){
  let userId = firebase.auth().currentUser;
  firebase.database().ref('users/' + userId.uid + '/products/' + item).remove();
}

function loadDB(){
  	let userId = firebase.auth().currentUser;

    //Get Database tree
	firebase.database().ref('/users/' + userId.uid + '/products/').once('value').then(function(snapshot) {
    var username = snapshot.val();
    console.log(username)
    let cartTable = document.getElementById('tableBody');
    let totalCost = 0;
    //Loop Through database items
    for(item in username){
      //Create new item in the cart
        let tr = document.createElement('tr');
        tr.setAttribute('id',item);
        tr.setAttribute('draggable', 'true');
        tr.setAttribute('ondragstart', "dragItemFromCart(event)");
        
        //set quantity TD
        let td = document.createElement('td');
        td.setAttribute('id','qty');
        td.innerHTML = username[item].qty;
        tr.appendChild(td);

        //set item name TD
        let td1 = document.createElement('td');
        td1.setAttribute('id','itemName');
        td1.innerHTML = item;
        tr.appendChild(td1);

        //set Price ID
        let td2 = document.createElement('td');
        td2.setAttribute('id','price');
        td2.innerHTML = username[item].price;
        tr.appendChild(td2);
        cartTable.appendChild(tr)

        //Calculate Total
        totalCost += Number(username[item].qty) * Number(username[item].price)
      console.log(username[item].qty);
    }
    document.getElementById('totalCost').innerHTML = totalCost;
  });
}

function getUserName(){
  let userId = firebase.auth().currentUser;

  //Get Username from Database
	firebase.database().ref('/users/' + userId.uid).once('value').then(function(snapshot) {
    let username = snapshot.val();
    localStorage.username = username.username;
  });
}


//functionality for Add to Cart button
function addToCartBtn(data) {
    console.log(data)
    let totalCost = Number(document.getElementById('totalCost').innerHTML);
    
    //Play Add notification sound
    //var audio = new Audio('sound/drop.m4a');
    var audio = new Audio('sound/show.mp3');
    audio.play();
    let cartTable = document.getElementById('tableBody');
    //let cartTable = document.getElementById('tableCart');

    let newItem = document.getElementById(data)
    console.log(newItem)
    if(newItem)
    { 
      //Ensures only items from the cart cannot be draaged and dropped to increase the number
      if(newItem.firstChild.innerHTML)
      {
        // Increment quantity by 1
        let itemQty = Number(newItem.firstChild.innerHTML) + 1;
        newItem.firstChild.innerHTML = itemQty;

        //Calculates and sets cost of total items in the cart
        totalCost += allItems[data];
        document.getElementById('totalCost').innerHTML = totalCost;

        //Write to Firebase Database
        writeToDB(data, itemQty, allItems[data]);
      }
    }
    else
    {
      //Checks if the item dragged is valid
      if(allItems[data] ){
        //Create new item in the cart
        let tr = document.createElement('tr');
    //let tr = cartTable.insertRow(0);
        tr.setAttribute('id',data);
        tr.setAttribute('draggable', 'true');
        //tr.setAttribute('value', data);
        tr.setAttribute('ondragstart', "dragItemFromCart(event)");
    //tr.addEventListener('dragstart',dragItemFromCart(event));
        
        //set quantity TD
        let td = document.createElement('td');
        td.setAttribute('id','qty');
        //td.className = 'tableHead1';
        td.innerHTML = 1;
        //td.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td);

        //set item name TD
        let td1 = document.createElement('td');
        td1.setAttribute('id','itemName');
        //td.className = 'tableHead2';
        td1.innerHTML = data;
        //td1.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td1);

        //set Price ID
        let td2 = document.createElement('td');
        td2.setAttribute('id','price');
        td2.innerHTML = allItems[data];
        //td2.setAttribute('ondragstart', "dragItemFromCart(event)");
        tr.appendChild(td2);
        cartTable.appendChild(tr)

        //Calculates Cost of item in the cart
        totalCost += allItems[data];
        document.getElementById('totalCost').innerHTML = totalCost;

        //Write to Firebase Database
        writeToDB(data, '1', allItems[data]);
      }
    }
}