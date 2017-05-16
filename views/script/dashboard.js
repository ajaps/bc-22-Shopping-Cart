//Allow elemetn to recieve other dragged element(s)
function allowDrop(ev) {
  ev.preventDefault();
}

//Appends data on item drag
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    console.log(data)
}