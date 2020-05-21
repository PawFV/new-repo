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

// SLIDE MENU
(function slideMenu() {
   const nav = document.getElementById('nav');
   const burger = document.getElementById('burger');
   const navItems = document.querySelectorAll('[data-active]');

   // SLIDE BURGER EVENT 
   burger.addEventListener('click', handleBurgerMenu);

   navItems.forEach(nav => nav.addEventListener('click', e => {
      if (document.documentElement.clientWidth <= 520) handleBurgerMenu();
   }));

   let initialHeight = '65px', finalHeight = '230px';

   function handleBurgerMenu() {

      nav.animate([
         { height: initialHeight },
         { height: finalHeight }
      ], {
         duration: 500,
         iterations: 1,
         easing: 'ease-in-out',
         fill: 'forwards'
      });

      // Switch values
      [initialHeight, finalHeight] = [finalHeight, initialHeight]
   }


})()


