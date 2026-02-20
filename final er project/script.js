// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== Navbar Scroll Effect ====================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ==================== Mobile Menu Toggle ====================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ==================== Smooth Scrolling ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== Scroll Reveal Animation ====================
    const revealElements = document.querySelectorAll('.feature-card, .step, .dashboard-card');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // ==================== Risk Meter Animation ====================
    function animateRiskMeter() {
        const riskProgress = document.getElementById('riskProgress');
        const riskNumber = document.getElementById('riskNumber');
        const riskLevel = document.getElementById('riskLevel');
        
        if (!riskProgress || !riskNumber || !riskLevel) return;
        
        // Target values
        const targetScore = 85;
        const circumference = 2 * Math.PI * 45; // r=45
        const offset = circumference - (targetScore / 100) * circumference;
        
        // Animate the progress circle
        riskProgress.style.strokeDashoffset = offset;
        
        // Animate the number counter
        let currentScore = 0;
        const duration = 2000;
        const increment = targetScore / (duration / 16);
        
        const counter = setInterval(function() {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(counter);
            }
            riskNumber.textContent = Math.round(currentScore);
        }, 16);
        
        // Update risk level text
        setTimeout(function() {
            if (targetScore >= 70) {
                riskLevel.textContent = 'Low Risk';
            } else if (targetScore >= 40) {
                riskLevel.textContent = 'Medium Risk';
            } else {
                riskLevel.textContent = 'High Risk';
            }
        }, duration);
    }
    
    // ==================== Stats Animation ====================
    function animateStats() {
        // Face Match Animation
        const faceMatchPercent = document.getElementById('faceMatchPercent');
        const faceMatchBar = document.getElementById('faceMatchBar');
        const faceStatus = document.getElementById('faceStatus');
        
        if (!faceMatchPercent || !faceMatchBar || !faceStatus) return;
        
        const targetFaceMatch = 98;
        let currentFace = 0;
        
        const faceCounter = setInterval(function() {
            currentFace += 2;
            if (currentFace >= targetFaceMatch) {
                currentFace = targetFaceMatch;
                clearInterval(faceCounter);
                
                // Update status to verified
                faceStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Verified</span>';
            }
            faceMatchPercent.textContent = currentFace + '%';
            faceMatchBar.style.width = currentFace + '%';
        }, 30);
    }
    
    // ==================== Intersection Observer for Animations ====================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If dashboard section is visible, start animations
                if (entry.target.classList.contains('risk-meter-card')) {
                    setTimeout(animateRiskMeter, 300);
                    setTimeout(animateStats, 500);
                }
                
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe dashboard cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        observer.observe(card);
    });
    
    // ==================== Active Nav Link on Scroll ====================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', highlightNavLink);
    }
    
    // ==================== Feature Cards Staggered Animation ====================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });
    
    // ==================== Steps Staggered Animation ====================
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.style.transitionDelay = (index * 0.2) + 's';
    });
    
    // ==================== Dashboard Cards Staggered Animation ====================
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });
    
    // ==================== Contact Form Handling ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show success message (in production, you'd send this to a server)
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ==================== Login Form Handling ====================
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Show success message (in production, you'd send this to a server)
            alert(`Welcome back! Logging you in as ${email}...`);
            
            // Reset form
            loginForm.reset();
        });
    }
    
    // ==================== Sign Up Form Handling ====================
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match! Please try again.');
                return;
            }
            
            // Show success message (in production, you'd send this to a server)
            alert(`Welcome, ${fullname}! Your account has been created successfully. Please check your email at ${email} to verify your account.`);
            
            // Reset form
            signupForm.reset();
        });
    }
    
    // ==================== Firebase Configuration ====================
    // Replace with your Firebase config from Firebase Console
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abc123def456"
    };
    
    // Initialize Firebase
    let auth;
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
    } catch (e) {
        console.log('Firebase not configured - using demo mode');
    }
    
    // ==================== Social Login Functions ====================
    function signInWithGoogle() {
        if (!auth) {
            alert('Firebase not configured. Demo mode: Would sign in with Google');
            return;
        }
        
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome ${user.displayName}! Logged in with Google.`);
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    }
    
    function signInWithApple() {
        if (!auth) {
            alert('Firebase not configured. Demo mode: Would sign in with Apple');
            return;
        }
        
        const provider = new firebase.auth.OAuthProvider('apple.com');
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome ${user.displayName || 'User'}! Logged in with Apple.`);
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    }
    
    function signInWithMicrosoft() {
        if (!auth) {
            alert('Firebase not configured. Demo mode: Would sign in with Microsoft');
            return;
        }
        
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome ${user.displayName || 'User'}! Logged in with Microsoft.`);
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    }
    
    // ==================== Social Login Event Listeners ====================
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const iconClass = this.querySelector('i').classList.value;
            
            if (iconClass.includes('fa-google')) {
                signInWithGoogle();
            } else if (iconClass.includes('fa-apple')) {
                signInWithApple();
            } else if (iconClass.includes('fa-microsoft')) {
                signInWithMicrosoft();
            }
        });
    });
    
    // ==================== Console Welcome Message ====================
    console.log('%c🚀 AI Tenant Verify - Final Year Project', 'font-size: 20px; font-weight: bold; color: #ffffff;');
    console.log('%cWelcome to the AI-Based Tenant Verification System', 'color: #888888;');
});
