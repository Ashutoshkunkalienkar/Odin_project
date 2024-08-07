const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu li"); // Select all the menu items

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Add click event listener to each menu item
navLinks.forEach(link => link.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}





//auto type
let typed = new Typed(".auto-type",{
    strings : [" Web Developer",  "Front-End Developer"],
    typeSpeed :100,
    backSpeed :100,
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



//scrooling animation
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
    console.log(entry)
    if(entry.isIntersecting){
        entry.target.classList.add('show');
    }else{
        entry.target.classList.remove('show');
    }
    });
});


const ProjectElements = document.querySelectorAll('.home-content')
ProjectElements.forEach((el) => observer.observe(el));

const homeElements = document.querySelectorAll('.home-pic')
homeElements.forEach((el) => observer.observe(el));

const aboutElements = document.querySelectorAll('.aboutme')
aboutElements.forEach((el) => observer.observe(el));

