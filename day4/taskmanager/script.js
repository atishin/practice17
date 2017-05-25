var list = document.getElementById('list');
var input = document.getElementById('input');
function addTask() {
    var li = document.createElement('li');
    var value = input.value;
    li.innerHTML = value;
    list.appendChild(li);
}
