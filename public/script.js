function init() {
   (initTyping = () => {
      "use strict"
      let titleOne = document.getElementById('description');
      let titleTwo = document.getElementById('description2');
      titleOne.textContent = "";
      titleTwo.textContent = "";

      let titleOneIndex = 0;
      (function typeTitle() {
         let titleOneText = `Hi I'm Paw...`

         if (titleOneIndex < titleOneText.length) {
            titleOne.textContent += titleOneText.charAt(titleOneIndex);
            titleOneIndex++;
            setTimeout(typeTitle, 120);
         } else typeDescription();
      })()

      let titleTwoIndex = 0;

      function typeDescription() {

         let titleTwoText = `I'm fullstack web developer;`;

         if (titleTwoIndex < titleTwoText.length) {
            titleTwo.textContent += titleTwoText.charAt(titleTwoIndex);
            titleTwoIndex++;
            setTimeout(typeDescription, 85);
         }
      }
   })();

   // PORTFOLIO SECTION DROP DOWN BUTTON
   (() => {
      const dropDownButtons = document.querySelectorAll('.dropdown-icon');
      const descriptionModal = document.querySelectorAll('.Description');
      console.log(dropDownButtons[0].dataset.drop)
      dropDownButtons.forEach(btn => btn.addEventListener('click', e => {
         handleDropDown(btn.dataset.drop);
      }));


      function handleDropDown(elementId) {

         descriptionModal[elementId].animate([
            {
               height: '0%',
               opacity: 0
            },
            {
               height: '100%',
               opacity: 1
            }
         ], {
            duration: 200,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards',
            direction: descriptionModal[elementId].dataset.dir
         });
         descriptionModal[elementId].dataset.dir === 'normal' ?
            descriptionModal[elementId].dataset.dir = 'reverse' :
            descriptionModal[elementId].dataset.dir = 'normal';

         // dropdown button
         dropDownButtons[elementId].classList.toggle('transform-arrow')
      }

   })()

   // MODAL HANDLER 
   const Modal = (() => {

      const contact = document.getElementById('contact');
      const form = document.getElementById('form');
      const closeForm = document.getElementById('closeForm');
      const formContainer = document.getElementById('formContainer');

      setTimeout(() => {
         contact.addEventListener('click', handleModal);
         closeForm.addEventListener('click', handleModal);
         console.log(closeForm)
      }, 200);


      let setModal = false;

      function handleModal() {
         if (setModal) {
            setModal = false;
            form.classList.remove('contact-slideDown');
            formContainer.style.visibility = "hidden";
         } else {
            setModal = true;
            form.classList.add('contact-slideDown');
            formContainer.style.visibility = "visible";
         }
         activeLink.handleLinks(activeLink.lastActiveElement());
      }

      return {
         handleModal: () => {
            if (setModal) {
               setModal = false;
               form.classList.remove('contact-slideDown');
               formContainer.style.visibility = "hidden";
            } else {
               setModal = true;
               form.classList.add('contact-slideDown');
               formContainer.style.visibility = "visible";
            }
            activeLink.handleLinks(activeLink.lastActiveElement());
         }
      }
   })();

   // SLIDE MENU HANDLER
   (function slideMenu() {
      const nav = document.getElementById('nav');
      const burger = document.getElementById('burger');
      const navItems = document.querySelectorAll('[data-active]');

      // SLIDE BURGER EVENT 
      let burgerTarget
      burger.addEventListener('click', e => {
         burgerTarget = e.target;
         handleBurgerAnimation(burgerTarget)
         handleBurgerMenu()
      });

      navItems.forEach(nav => nav.addEventListener('click', e => {
         if (document.documentElement.clientWidth <= 520) {
            handleBurgerMenu();
            handleBurgerAnimation(burgerTarget);
         }

      }));

      let dir = 'normal'
      function handleBurgerAnimation(burger) {
         burger.animate([
            {
               transform: `rotate(${0}deg)`,
               color: 'white'
            },
            {
               transform: `rotate(${-90}deg)`,
               color: 'rgb(236, 97, 97)'
            }
         ], {
            duration: 500,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards',
            direction: `${dir}`
         });

         (dir === 'normal') ? dir = 'reverse' : dir = 'normal';
      }

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



   // NAV LINKS 
   const activeLink = (() => {
      let activeLinks = document.querySelectorAll('[data-active]');
      const portfolio = document.getElementById('portfolio');
      const windowHeightBreakPoint = window.innerHeight * 40 / 100;

      const ABOUT = activeLinks[0], PORTFOLIO = activeLinks[1], CONTACT = activeLinks[2];
      let lastActiveElement = ABOUT;

      window.addEventListener('scroll', handleScroll)

      // ADD EVENTS CLICK NAVBAR
      activeLinks.forEach(element => {
         element.addEventListener('click', e => {
            if (e.target !== CONTACT) {
               lastActiveElement = element;
            };
            clearScrollEvent()
            handleLinks(element);
         })
      });
      function handleScroll() {
         if (portfolio.getBoundingClientRect().y < windowHeightBreakPoint) {
            handleLinks(PORTFOLIO);
            lastActiveElement = PORTFOLIO
         } else {
            handleLinks(ABOUT)
            lastActiveElement = ABOUT
         }
      };

      function clearScrollEvent() {
         window.removeEventListener('scroll', handleScroll);

         setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
         }, 450);
      };

      function handleLinks(element) {
         activeLinks.forEach(i => i.classList.remove('active'));
         element.classList.add('active');
      }

      return {
         handleLinks: (element) => {
            activeLinks.forEach(i => i.classList.remove('active'));
            element.classList.add('active');
         },
         lastActiveElement: () => lastActiveElement
      }

   })();

   // SUBMIT FORM 
   (submitForm = () => {

      // Init event
      let submit = document.getElementById('submitButton');
      const url = 'https://portfolio-nodemailer.herokuapp.com/mailer';

      submit.addEventListener('click', e => {
         e.preventDefault()
         handleSubmit()
      });


      function handleSubmit() {
         const bodyMsg = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
         }

         if (!bodyMsg.name || !bodyMsg.email || !bodyMsg.message) return swal('', "You must complete all fields.", "error");

         fetchMail(bodyMsg)
      }

      async function fetchMail(bodyMsg) {

         handleSubmitState('wait', true);
         try {
            const data = await fetch(url, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(bodyMsg)
            })
            const dataJSON = await data.json()

            // Handle state of response 
            handleSubmitState('default', false);
            Modal.handleModal();

            if (!data.ok) return swal('Sorry', "There was an error, try it later.", "error");

            swal(dataJSON.message, "", "success");

         } catch (error) {
            Modal.handleModal();
            handleSubmitState('default', false);
            swal('Sorry', "There was an error, try it later.", "error");
         }
      }

      // Button disabled/enabled, Cursor wait/default
      function handleSubmitState(cursorState, submitButtonState) {
         document.body.style.cursor = cursorState;
         submit.disabled = submitButtonState;
         if (!submit.disabled) return submit.style.backgroundColor = '#fff'
         submit.style.backgroundColor = 'rgb(190, 190, 190)';
      }
   }
   )()
}

window.addEventListener('load', e => setTimeout(init, 100));


// I love vanilla JS, I mean, I ABSOLUTELY LOVE JS!!!
