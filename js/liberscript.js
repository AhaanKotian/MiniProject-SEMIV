const siginmodal = document.querySelector( '#modal' );
const openSiginModal = document.querySelector( '.loginbtn' );
const closeSiginModal = document.querySelector( '.sign-in_btn' );

openSiginModal.addEventListener('click',() => {
    siginmodal.showModal();
})

closeSiginModal.addEventListener('.click',()=>{
    siginmodal.close();
})
