
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
	}
	else{
		location = '/login';
	}
})



function logOut(){
	firebase.auth().signOut().then(function() {
	alert('logged Out');
	}).catch(function(error){
	});
}
const allItems = {'Eggs':900, 'Hamburger':200, 'Polenta':350, 'Meatball Sub':5000, 'Eggplant':700, 'hand-bag':50000}
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
    
    
    let cartTable = document.getElementById('tableBody');
    //let cartTable = document.getElementById('tableCart');

    let newItem = document.getElementById(data)

    if(newItem)
    { 
      //Ensures only items from the cart cannot be draaged and dropped to increase the number
      if(newItem.firstChild.innerHTML)
      {
        // Increment quantity by 1
        let itemQty = Number(newItem.firstChild.innerHTML);
        newItem.firstChild.innerHTML = itemQty + 1;

        //Calculates and sets cost of total items in the cart
        totalCost += allItems[data];
        document.getElementById('totalCost').innerHTML = totalCost;
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
      }
    }
}


//Appends data on item drag from Cart
function dragItemFromCart(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('id'));
}

function removeItem(ev) {
    ev.preventDefault();
    let totalCost;
    let data = ev.dataTransfer.getData("text");
    let newItem = document.getElementById(data)

    //Get the quantity value
    let getItemQty = Number(newItem.firstChild.innerHTML);

    //Check if qty is  equal to 1 - remove else decrement by 1
    if(getItemQty>1){
      newItem.firstChild.innerHTML = getItemQty - 1;
      totalCost = Number(document.getElementById('totalCost').innerHTML);
      //subtract from total cost
      totalCost =totalCost -  allItems[data];
      document.getElementById('totalCost').innerHTML = totalCost;
    }
    else{
      totalCost = Number(document.getElementById('totalCost').innerHTML);
      totalCost -= allItems[data];
      //subtract from total cost      
      document.getElementById('totalCost').innerHTML = totalCost;
      let row = document.getElementById(data);
      row.parentNode.removeChild(row);
      
    }

  }