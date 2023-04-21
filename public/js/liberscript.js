const siginmodal = document.querySelector( '#modal' ); //signin modAL
const sigupmodal = document.querySelector('#modal1'); //signup modal
const loginButton = document.querySelector( '.loginbtn' ); //button on homepage
const signinButton = document.querySelector( '.sign-in_btn' ); //button on signin modal 
const signupButton = document.querySelector('.signupbtn'); //sign up button on sign in modal
const emailInput = document.getElementById('email_field_sign_in'); //email field in sign in modal
const passInput = document.getElementById('password_field_sign_in'); // password field in sign in modal
const emailErrorDisp = document.querySelector(".errorDispEmail"); //error disp on email everywhere
const passErrorDisp = document.querySelector(".errorDispPass"); //error disp on password everywhere
const closeButton = document.querySelector(".closex"); //sign in closex
const signupcloseButton = document.querySelector(".signupclosex"); //sign up  closex
const signupmain = document.querySelector(".sign-up_btn"); //sign up button on sign up modal


//INPUT VALIDATION
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//INITIAL CLICKS
loginButton.addEventListener('click',(e) => {
    siginmodal.showModal();
})

closeButton.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e);
    siginmodal.close();
})

signinButton.addEventListener('click',errorDispSI);

function errorDispSI(e){
    //e.preventDefault();
    if(!emailInput.value.match(mailformat)){
        e.preventDefault();
        emailErrorDisp.classList.add('error');
        emailErrorDisp.innerHTML = 'Please enter valid email';
    }
    else{
        emailErrorDisp.innerHTML = '';
    }

    if(passInput.value===''){
        e.preventDefault();
        passErrorDisp.classList.add('error');
        passErrorDisp.innerHTML = 'Please enter valid password';
    }
    else{
        passErrorDisp.innerHTML = '';
    }

    if(emailInput.value.match(mailformat) && passInput.value!=''){
        siginmodal.close();
    }
    else
    {
      siginmodal.showModal();
    }
}

signupButton.addEventListener('click',(e) => {
    siginmodal.close();
    sigupmodal.showModal();
})

signupcloseButton.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e);
  sigupmodal.close();
})
//INTIAL CLICKS END



//AFTER USER REGISTERS/ LOGS IN
if(document.getElementById('SUerror'))
{
  sigupmodal.showModal();
}
else if(document.getElementById('SUsuc'))
{
  siginmodal.showModal();
  document.getElementById('SUsuc').innerHTML = "Signup Successful! Please Login";
}

if(document.getElementById('SIerror'))
{
  siginmodal.showModal();
}

if(document.getElementById('hlb'))
{
  loginButton.remove();
}
//AFTER USER REGISTERS/ LOGS IN END




//SCROLL STUFF
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".panel"),
  container = document.querySelector(".container");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 0.5,
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + container.offsetWidth,
  },
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

 