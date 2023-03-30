const siginmodal = document.querySelector( '#modal' );
const sigupmodal = document.querySelector('#modal1');
const loginButton = document.querySelector( '.loginbtn' ); //button on homepage
const signinButton = document.querySelector( '.sign-in_btn' ); //button on signin modal
const signupButton = document.querySelector('.signupbtn');
const emailInput = document.getElementById('email_field');
const passInput = document.getElementById('password_field');
const emailErrorDisp = document.querySelector(".errorDispEmail");
const passErrorDisp = document.querySelector(".errorDispPass");
const closeButton = document.querySelector(".closex");
const signupcloseButton = document.querySelector(".signupclosex");

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

loginButton.addEventListener('click',(e) => {
    siginmodal.showModal();
})

closeButton.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e);
    siginmodal.close();
})

signinButton.addEventListener('click',errorDisp);

function errorDisp(e){
    e.preventDefault();
    if(!emailInput.value.match(mailformat)){
        emailErrorDisp.classList.add('error');
        emailErrorDisp.innerHTML = 'Please enter valid email';
    }
    else{
        emailErrorDisp.innerHTML = '';
    }

    if(passInput.value===''){
        passErrorDisp.classList.add('error');
        passErrorDisp.innerHTML = 'Please enter valid password';
    }
    else{
        passErrorDisp.innerHTML = '';
    }

    if(emailInput.value.match(mailformat) && passInput.value!=''){
        siginmodal.close();
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