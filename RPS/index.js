let arr=["rock", "paper","scissor"];

    
    let computer = arr[Math.floor(Math.random() * arr.length)];

    // document.write("\n");
    let user = window.prompt("enetr any value (ROCK, PAPER AND SCISSOR)");
    var r="rock"; var p="paper"; var s="scissor";
    document.write("computers is ",computer);
    document.write("<br> <br>")
    document.write("\n","users is " ,user);
    document.write("<br><br>")

if(computer == user)
{
    document.write("TIE");
}

else if(computer == "rock" && user == "paper")
{
    document.write("USER WINS");
}

else if(computer == "rock" && user == "scissors")
{
    document.write("COMPUTER WINS");
}

else if(computer == "paper" && user == "rock")
{
    document.write("COMPUTER WINS");
}

// else if(computer == 1 /*paper*/ && user == 1 /*rock*/)
// {
//     document.write("tie");
// }

else if(computer == "paper" && user == "scissor")
{
    document.write("USER WINS");
}

else if(computer == "scissor" && user == "rock")
{
    document.write("USER WINS")
}

else if(computer == "scissor" && user =="paper")
{
    document.write("COMPUTER WINS")
}

else
{
    document.write("no valid number")
}