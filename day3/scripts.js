function setColor(element, color) {
    element.className = color;
}

document.addEventListener('DOMContentLoaded', function () {
    var div = document.getElementById('test');

    var btn1 = document.getElementById('btn-1');
    var btn2 = document.getElementById('btn-2');


    btn1.addEventListener('click', function() {
        setColor(div, 'red');
    });
    
    btn2.addEventListener('click', function() {
        setColor(div, 'green');
    });

});

