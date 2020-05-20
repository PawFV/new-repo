const contact = document.getElementById('contact');
const form = document.getElementById('form');
const closeForm = document.getElementById('closeForm');
const formContainer = document.getElementById('formContainer');

contact.addEventListener('click', e => {
   e.preventDefault()
   handleModal();
})

let setModal = false;

function handleModal() {
   if (setModal) {
      setModal = false;
      form.classList.remove('contact-slideDown')
      formContainer.style.visibility = "hidden";
   }
   else {
      setModal = true;
      form.classList.add('contact-slideDown')
      formContainer.style.visibility = "visible";
   }
}

(function slideMenu() {
   const nav = document.getElementById('nav');
   const burger = document.getElementById('burger');


   burger.addEventListener('click', handleBurgerMenu(initialHeight, finalHeight))

   let initialHeight = '65px', finalHeight = '300px';

})()

function handleBurgerMenu(initialHeight, finalHeight) {
   nav.animate([
      // keyframes
      { height: initialHeight },
      { height: finalHeight }
   ], {
      // timing options
      duration: 1000,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
   });
   [initialHeight, finalHeight] = [finalHeight, initialHeight]
}
