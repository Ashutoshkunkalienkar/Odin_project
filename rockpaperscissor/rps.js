/* These lines of code are selecting HTML elements with specific IDs and assigning them to variables. */
const playertext = document.querySelector("#playertext")  //selecting an id that is playertext
const computertext = document.querySelector("#computertext") //selecting an id that is computertext
const resulttext = document.querySelector("#resulttext") //selecting an id that is resulttext

/* The line of code `const choicebtn = document.querySelectorAll(".choicebtn")` is selecting all HTML
elements with the class name "choicebtn" and assigning them to the variable `choicebtn`. These
elements are likely buttons representing the choices of rock, paper, and scissors in a game. */
const choicebtn = document.querySelectorAll(".choicebtn") //selecting all buttons(i.e- rock paper scissor)

/* These lines of code are declaring three variables: `player`, `computer`, and `result`. These
variables are initially undefined and will be used to store the player's choice, the computer's
choice, and the result of the game, respectively. */
let player; //let us create some variable as shown below
let computer;//let us create some variable as shown below
let result;//let us create some variable as shown below

/* This code is adding an event listener to each button in the `choicebtn` array. When a button is
clicked, the code inside the arrow function will be executed. */
//select the button we want 
choicebtn.forEach(button => button.addEventListener("click", () => {


/* The line `player = button.textContent;` is assigning the text content of the clicked button to the
variable `player`. This line is used to determine the player's choice in the rock-paper-scissors
game. */
    player = button.textContent; //players choice 

/* The line `computerTurn();` is calling the `computerTurn()` function. This function is responsible
for randomly selecting a value (rock, paper, or scissors) for the computer's turn in the
rock-paper-scissors game. By calling `computerTurn()`, the computer's choice is determined and
stored in the `computer` variable. */
    computerTurn(); //this calls computerTurn()

/* The line `playertext.textContent = player` is setting the text content of the HTML element with the
ID "playertext" to the value of the `player` variable. This is used to display the selected output
by the player in the rock-paper-scissors game. */
    playertext.textContent =  player  //diplayes th selected output by playerr

/* The line `computertext.textContent = computer` is setting the text content of the HTML element with
the ID "computertext" to the value of the `computer` variable. This is used to display the selected
output by the computer in the rock-paper-scissors game. */
    computertext.textContent = computer //displays the selected output by computer


/* The line `resulttext.textContent = checkWinner();` is setting the text content of the HTML element
with the ID "resulttext" to the result of the `checkWinner()` function. This line is responsible for
displaying the winner of the rock-paper-scissors game on the webpage. The `checkWinner()` function
determines the winner based on the player's and computer's choices, and the result is then assigned
to the `resulttext` element. */
    resulttext.textContent = checkWinner(); //this tells the winner and also calls the function called checkwinner as shown in line (40)

}));

/**
 * The function "computerTurn" randomly selects a value (rock, paper, or scissors) for the computer's
 * turn in a game.
 */
//here the computer select the random values as show in below 
function computerTurn() {        //=> computer turn

/* The line of code `const randNum = Math.floor(Math.random() *3) +1;` is generating a random number
between 1 and 3. This random number is used to determine the computer's choice in the
rock-paper-scissors game. The `Math.random()` function generates a random decimal number between 0
and 1. Multiplying this number by 3 gives a random decimal number between 0 and 3. The
`Math.floor()` function rounds down this decimal number to the nearest whole number. Adding 1 to the
result ensures that the random number is between 1 and 3. */
    const randNum = Math.floor(Math.random() *3) +1;  //here the computer select the random string as given below 

   /* The `switch` statement is used to perform different actions based on different conditions. In
   this case, the `switch` statement is being used to determine the computer's choice in the
   rock-paper-scissors game. */
    switch (randNum) {  //=>
        case 1:         //case one is rock
            computer = "✊";
            break;
        case 2:         //caase 2 is paper 
            computer = "🖐️";
            break;
        case 3:         //case 3 is scissor
            computer = "✌️";
            break;
    }
}

/**
 * The function "checkWinner" determines the winner of a rock-paper-scissors game between a player and
 * a computer.
 * @returns the result of the game, which can be "Draw" if the player and computer have the same
 * choice, "you win!" if the player wins, or "computer wins" if the computer wins.
 */
function checkWinner(){ //checks who is the winner 
    
    /* This code block is part of the `checkWinner()` function and is used to determine the winner of
    the rock-paper-scissors game between the player and the computer. */
    if(player == computer) //this says that if player is == computer then it is tie
    {
        return "Draw";
    }
    else if(computer =="✊"){ 
        return(player == "🖐️") ? "you win!":"computer wins"
    }
    else if(computer =="🖐️"){
        return(player == "✌️") ? "you win!":"computer wins"
    }
    else if(computer =="✌️"){
        return(player == "✊") ? "you win!":"computer wins"
    }
}