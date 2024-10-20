var cursor = document.querySelector("#cursor")
var parent = document.querySelector("#parent")

parent.addEventListener("mousemove",(e)=>{
    gsap.to(cursor,{
        x:e.x,
        y:e.y,
        opacity:1,
        duration:0.5,
        ease:"back.out(1.7)"
    })
} )






function animationMain1(){
    var tl = gsap.timeline()

tl.from("#logo img",{
    opacity:0,
    duration:0.3,
    delay:0.4,
    y:-50
})

tl.from("#logo h1",{
    opacity:0,
    duration:0.3,
    y:-50,
})

tl.from("#navlist span",{
    opacity:0,
    duration:0.3,
    y:-50,
    stagger:0.2
})

tl.from("#navlist button",{
    opacity:0,
    duration:0.3,
    y:-100
})


tl.from(".text-1 h1",{
    opacity:0,
    duration:0.3,
    x:-100,
    stagger:0.2,
})


tl.from(".text-2 p",{
    opacity:0,
    duration:0.3,
    x:-100,
}, 'ab')

tl.from("#pagePart2 img",{
    opacity:0,
    duration:0.3,
    x:100
},'ab')

tl.from(".text-2 button",{
    opacity:0,
    duration:0.3,
    x:-100
})

tl.from("#brands img",{
    opacity:0,
    duration:0.3,
    y:-50,
    stagger:0.2
})

}


function animationMain2(){
    var tl2 = gsap.timeline({
        scrollTrigger:{
            trigger:"#main2",
            scroll:"body",
            // markers:true,
            start:"top 50%",
            end:"top 0%",
            scrub:2
        }
    })
    
    tl2.from(".service",{
        x:-100,
        duration:0.5,
        opacity:0,
    })
    
    
    tl2.from(".card1.line1.left",{
        x:-100,
        duration:0.5,
        opacity:0,
    },'ab')
    tl2.from(".card1.line2.right",{
        x:100,
        duration:0.5,
        opacity:0,
    },'ab')
    tl2.from(".card1.line3.left",{
        x:-100,
        duration:0.5,
        opacity:0,
    },'a')
    tl2.from(".card1.line4.right",{
        x:100,
        duration:0.5,
        opacity:0,
    },'a')
}

var card1 = document.querySelector(".card1.left.line1")
var card2 = document.querySelector(".card1.right.line2")
var card3 = document.querySelector(".card1.left.line3")
var card4 = document.querySelector(".card1.right.line4")

function cardZoom(){
    card1.addEventListener("mouseenter",()=>{
        gsap.to(card1,{
            scale:1.1
        })
    })
    card1.addEventListener("mouseleave",()=>{
        gsap.to(card1,{
            scale:1
        })
    })

    card2.addEventListener("mouseenter",()=>{
        gsap.to(card2,{
            scale:1.1
        })
    })
    card2.addEventListener("mouseleave",()=>{
        gsap.to(card2,{
            scale:1
        })
    })

    card3.addEventListener("mouseenter",()=>{
        gsap.to(card3,{
            scale:1.1
        })
    })
    card3.addEventListener("mouseleave",()=>{
        gsap.to(card3,{
            scale:1
        })
    })

    card4.addEventListener("mouseenter",()=>{
        gsap.to(card4,{
            scale:1.1
        })
    })
    card4.addEventListener("mouseleave",()=>{
        gsap.to(card4,{
            scale:1
        })
    })
}


animationMain1()
animationMain2()
cardZoom()