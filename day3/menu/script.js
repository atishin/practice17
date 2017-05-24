
function initSubMenu(link) {

}

document.addEventListener('DOMContentLoaded', function() {
    var links = document.getElementsByClassName('has-sub-menu');

    for (var i = 0; i < links.length; i ++) {
        var item = links.item(i);
        
        item.addEventListener('click', function() {
           var subMenus = item.getElementsByClassName('sub-menu');
           if (subMenus.length == 0) return;
           var menu = subMenus.item(0);

           if (menu.classList.contains('active')) {
               menu.className = "sub-menu";
           } else {
               menu.className = "sub-menu active";
           }
        });

    }

    var okButton = document.getElementById('ok');
    var input = document.getElementById('task');
    var list = document.getElementById('list');

    okButton.addEventListener('click', function() {
        var listitem = document.createElement('li');
        listitem.innerHTML = input.value;
        list.appendChild(listitem);
    });

});