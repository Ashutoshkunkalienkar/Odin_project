/* These lines of code are selecting HTML elements from the DOM (Document Object Model) using their
respective IDs. */
let container = document.getElementById('container')
let colorPicker = document.getElementById('colorPicker')
let eraserButton = document.getElementById('eraser')

//setting initial drwing color
let currentColor = '#ff0080';

//function to change the drawing color when the color picker value changes
colorPicker.addEventListener('input',function(){
    currentColor = colorPicker.value
});

/* The code block `eraserButton.addEventListener('click',function(){ currentColor = 'white';//set the
white eraser });` is adding an event listener to the `eraserButton` element. */
//function to set the current color to white(eraser)
eraserButton.addEventListener('click',function(){
    currentColor = 'white';//set the white eraser
});

/* This code is creating a 16x16 grid of div elements and appending them to the container element. */
for(let i=0; i< 16 * 16 ;i++){
    let div =document.createElement('div');
    // div.style.border = "thin solid black";
    div.className = "grid-item";
    // div.style.width - "25px";
    // div.style.height = "25px";
    container.appendChild(div)
}

/* This code is selecting all the elements with the class name "grid-item" using the
`document.querySelectorAll('.grid-item')` method. It then iterates over each selected element using
the `forEach` method and adds an event listener to each element. */
let grid = document.querySelectorAll('.grid-item');
grid.forEach(function (item){
    item.addEventListener('mouseover', function (e){
        e.target.style.backgroundColor = currentColor;//use the selected  color by the user for drawing 
    });
});