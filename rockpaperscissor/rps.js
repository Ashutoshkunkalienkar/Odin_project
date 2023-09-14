const playertext = document.querySelector("#playertext")  //selecting an id that is playertext
const computertext = document.querySelector("#computertext") //selecting an id that is computertext
const resulttext = document.querySelector("#resulttext") //selecting an id that is resulttext

const choicebtn = document.querySelectorAll(".choicebtn") //selecting all buttons(i.e- rock paper scissor)
//let us create some variable as shown below
let player; 
let computer;
let result;

//select the button we want 
choicebtn.forEach(button => button.addEventListener("click", () => {


    player = button.textContent; //players choice 
    computerTurn(); //this calls computerTurn()
    playertext.textContent =  player  //diplayes th selected output by playerr
    computertext.textContent = computer //displays the selected output by computer
    resulttext.textContent = checkWinner(); //this tells the winner and also calls the function called checkwinner as shown in line (40)

}));

//here the computer select the random values as show in below 
function computerTurn() {        //=> computer turn
    const randNum = Math.floor(Math.random() *3) +1;  //here the computer select the random string as given below 

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

function checkWinner(){ //checks who is the winner 
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