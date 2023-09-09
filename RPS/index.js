let arr=["rock", "paper","scissor"];

    
    let computer = arr[Math.floor(Math.random() * arr.length)];

    // document.write("\n");
    let user = window.prompt("enetr any value (ROCK, PAPER AND SCISSOR)");
    var r="rock"; var p="paper"; var s="scissor";
    document.write("computers is: ",computer);
    document.write("<br> <br>")
    document.write("\n","users is: " ,user);
    document.write("<br><br>")

if(computer == user)
{
    document.write("<h1>TIE</h1>");
}

else if(computer == "rock" && user == "paper")
{
    document.write("<h1>USER WINS</h1>");
}

else if(computer == "rock" && user == "scissors")
{
    document.write("<h1>COMPUTER WINS</h1>");
}

else if(computer == "paper" && user == "rock")
{
    document.write("<h1>COMPUTER WINS</h1>");
}

// else if(computer == 1 /*paper*/ && user == 1 /*rock*/)
// {
//     document.write("tie");
// }

else if(computer == "paper" && user == "scissor")
{
    document.write("<h1>USER WINS<h1>");
}

else if(computer == "scissor" && user == "rock")
{
    document.write("<h1>USER WINS</h1>")
}

else if(computer == "scissor" && user =="paper")
{
    document.write("<h1>COMPUTER WINS</h1>")
}

else
{
    document.write("no valid number")
}