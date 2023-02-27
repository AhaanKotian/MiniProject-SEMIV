const siginmodal = document.querySelector( '#modal' );
const loginButton = document.querySelector( '.loginbtn' ); //button on homepage
const signinButton = document.querySelector( '.sign-in_btn' ); //button on signin modal
const emailInput = document.getElementById('email_field');
const passInput = document.getElementById('password_field');
const emailErrorDisp = document.querySelector(".errorDispEmail");
const passErrorDisp = document.querySelector(".errorDispPass");

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

loginButton.addEventListener('click',(e) => {
    siginmodal.showModal();
})

/*signinButton.addEventListener('.click',()=>{
    siginmodal.close();
})*/

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
}