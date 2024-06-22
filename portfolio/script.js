const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);


function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}



//auto type
let typed = new Typed(".auto-type",{
    strings : ["Web Developer",  "Front-end Developer"],
    typeSpeed :150,
    backSpeed :150,
    loop :true
})

//smooth scrolling
const navigation = document.querySelector(".nav-menu");
const navigation1 = document.querySelector(".hamburger");

const navigationHeight = navigation.offsetHeight;
document.documentElement.style.setProperty(
    "--scroll-padding",
    navigationHeight + "px"
);

const navigationHeight1 = navigation1.offsetHeight;
document.documentElement.style.setProperty(
    "--scroll-padding",
    navigationHeight1 + "px"
);