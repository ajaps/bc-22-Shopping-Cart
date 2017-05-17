
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
    let totalCost = document.getElementById('totalCost');
    
    
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
        total += allItems[data];
        document.getElementById('totalCost').innerHTML = total;
      }
    }
    else
    {
      //Checks if the item dragged is valid
      if(allItems[data] ){
        console.log(data)
        //Create new item in the cart
        let tr = document.createElement('tr');
		//let tr = cartTable.insertRow(0);
        tr.setAttribute('id',data);
        tr.setAttribute('dragable', 'true');
        //tr.setAttribute('value', data);
        tr.setAttribute('ondragstart', "dragItemFromCart(event)");
		//tr.addEventListener('dragstart',dragItemFromCart(event));
        
        //set quantity TD
        let td = document.createElement('td');
        td.setAttribute('id','qty');
        //td.className = 'tableHead1';
        td.innerHTML = 1;
        tr.appendChild(td);

        //set item name TD
        let td1 = document.createElement('td');
        td1.setAttribute('id','itemName');
        //td.className = 'tableHead2';
        td1.innerHTML = data;
        tr.appendChild(td1);

        //set Price ID
        let td2 = document.createElement('td');
        td2.setAttribute('id','price');
        td2.innerHTML = allItems[data];
        tr.appendChild(td2);
        console.log(tr)
        cartTable.appendChild(tr)

        //Calculates Cost of item in the cart
        total += allItems[data];
        document.getElementById('totalCost').innerHTML = total;
      }
    }
}


//Appends data on item drag from Cart
function dragItemFromCart(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('id'));
}

function removeItem(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log(data)
    let newItem = document.getElementById(data)

    //Get the quantity value
    let getItemQty = newItem.firstChild;
    console.log(getItemQty.nextSibling.innerHTML)
    let itemQty = Number(getItemQty.nextSibling.innerHTML);

    //Check if qty is  equal to 1 - remove else decrement by 1
    if(itemQty>1){
      getItemQty.nextSibling.innerHTML = itemQty - 1;

      let totalCost = Number(document.getElementById('totalCost').innerHTML);
      console.log(totalCost)
      //subtract from total cost
      totalCost -= allItems[data];
      document.getElementById('totalCost').innerHTML = totalCost;
    }
    else{
      let row = document.getElementById(data);
      row.parentNode.removeChild(row);
      console.log(document.getElementById('tableCart'))
    }

  }