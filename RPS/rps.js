compchoose()
// userchoice()
result()



    function button1() {
    
        let user = document.getElementById('user')
        let btn = document.getElementById('rock')
        //  console.log(btn.textContent)
    
        user.textContent = btn.textContent
        result();
    }
    
    
    function button2() {
        let users = document.getElementById('user')
        let btnn = document.getElementById('paper')
        //  console.log(btn.textContent)
    
        user.textContent = btnn.textContent
        result();

    }
    
    function button3() {
        let users = document.getElementById('user')
        let btnn = document.getElementById('scissor')
        //  console.log(btn.textContent)
    
        user.textContent = btnn.textContent
        result();

    }


    // function result(){
    //     let computer = ["✊","🖐️","✌️"]
    //     let computermove = computer[Math.floor(Math.random() * computer.length)] 

    //     console.log(playersmove)
    //     console.log(computersmove)


    //     if(user == computer)
    //     {
    //         console.log("tie")
    //     }
    // }



function compchoose() {

    compchoose = Math.floor(Math.random() * 3)
    switch (compchoose) {
        case 0:
            comp.textContent = rock.textContent
            console.log(comp.textContent);
            break; 
            result();
        case 1:
             comp.textContent = paper.textContent
             console.log(comp.textContent);
             break;
             result();
             case 2:
                 comp.textContent = scissor.textContent
                 console.log(comp.textContent);
                 break;
                }
                result();
}

document.getElementById("rock").onclick = function() {
    window.users = "rock";
    game();
}

