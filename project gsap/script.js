var cursor = document.querySelector("#cursor")
var parent = document.querySelector("#parent")
var card1 = document.querySelector(".card1.left.line1")
var card2 = document.querySelector(".card1.right.line2")
var card3 = document.querySelector(".card1.left.line3")
var card4 = document.querySelector(".card1.right.line4")

function loaderAnimation()
{
    var tl3 = gsap.timeline()

        tl3.to("#loadertext img",{
            rotate:360,
            duration:1,
            y:-150,
            opacity:1,
        },'a')

        tl3.from("#loadertext",{
            width:"0%",
            duration:1,
            opacity:0,
        },'a')

        tl3.to("#loader",{
            opacity:0,
            y:"-100%"
            
        })
    
}

function cursorAnimation(){
    parent.addEventListener("mousemove",(e)=>{
        // console.log(e)
        gsap.to(cursor,{
            x:e.clientX,
            y:e.clientY,
            opacity:1,
            duration:0.5,
            ease:"back.out(1.7)"
        })
    } )
}

function animationMain1(){
    var tl = gsap.timeline()

tl.from("#logo img",{
    // opacity:0,
    duration:2,
    // delay:0.2,
    // y:-50
    rotate:360,
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

function cardDetails()
{
    card1.addEventListener("mouseenter",()=>{
        gsap.to(cursor,{
            width:"15rem",
            height:"20rem",
            borderRadius:"0%",
            backgroundImage:"url(https://img.freepik.com/premium-photo/woman-working-laptop-with-colorful-abstract-background_1060494-16758.jpg?w=900)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        })
    })
    card1.addEventListener("mouseleave",()=>{
        gsap.to(cursor,{
            width:"10px",
            height:"10px",
            borderRadius:"100%",
            backgroundImage:"none"
        })
    })
    card2.addEventListener("mouseenter",()=>{
        gsap.to(cursor,{
            width:"15rem",
            height:"20rem",
            borderRadius:"0%",
            backgroundImage:"url(https://img.freepik.com/premium-photo/programmer-tapped-computer_300636-6120.jpg?w=740)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        })
    })
    card2.addEventListener("mouseleave",()=>{
        gsap.to(cursor,{
            width:"10px",
            height:"10px",
            borderRadius:"100%",
            backgroundImage:"none"
        })
    })
    card3.addEventListener("mouseenter",()=>{
        gsap.to(cursor,{
            width:"15rem",
            height:"20rem",
            borderRadius:"0%",
            backgroundImage:"url(https://img.freepik.com/premium-photo/woman-studying-data-charts_1326522-4612.jpg?w=740)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        })
    })
    card3.addEventListener("mouseleave",()=>{
        gsap.to(cursor,{
            width:"10px",
            height:"10px",
            borderRadius:"100%",
            backgroundImage:"none"
        })
    })
    card4.addEventListener("mouseenter",()=>{
        gsap.to(cursor,{
            width:"15rem",
            height:"20rem",
            borderRadius:"0%",
            backgroundImage:"url(https://img.freepik.com/premium-photo/person-holding-gadget_1054941-49045.jpg?w=740)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        })
    })
    card4.addEventListener("mouseleave",()=>{
        gsap.to(cursor,{
            width:"10px",
            height:"10px",
            borderRadius:"100%",
            backgroundImage:"none"
        })
    })
}

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
loaderAnimation()
cursorAnimation()
animationMain1()
animationMain2()
// cardDetails()
cardZoom()