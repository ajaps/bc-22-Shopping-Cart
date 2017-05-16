
//Cart Item Template
let itemTemplate = '<td id="qty">2</td>'+
'<td id="itemName">Eggs</td>'+
'<td id="price">$900</td>';



//Allow elemetn to recieve other dragged element(s)
function allowDrop(ev) {
  ev.preventDefault();
}

//Appends data on item drag
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('id'));
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    
    
    let cartTable = document.getElementById('tableCart');

    let tr = document.createElement('tr');
    tr.setAttribute('id',data);
    tr.setAttribute('dragable', 'true');

    /*
    //set quantity TD
    let td = document.createElement('td');
    td.setAttribute('id','qty');
    td.innerText = 2;
    tr.appendChild(td);
    console.log(tr);

    //set item name TD
    let td1 = document.createElement('td');
    td1.setAttribute('id','itemName');
    td1.innerText = 'Google';
    tr.appendChild(td1);
    console.log(td1);

    //set Price ID
    let td2 = document.createElement('td');
    td2.setAttribute('id','price');
    td2.innerText = '$900';
    tr.appendChild(td2);
    console.log(td2);*/
    tr.innerHTML = itemTemplate;
    //tr.getElementById('qty').innerText = '5';
    cartTable.appendChild(tr)
    
    console.log(data)
}