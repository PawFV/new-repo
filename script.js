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

   // MODAL HANDLER 
   (Modal = () => {
      const contact = document.getElementById('contact');
      const form = document.getElementById('form');
      const closeForm = document.getElementById('closeForm');
      const formContainer = document.getElementById('formContainer');

      contact.addEventListener('click', handleModal);
      closeForm.addEventListener('click', handleModal);

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
}

window.addEventListener('load', init);

// I love vanilla JS, I mean, I ABSOLUTELY LOVE JS!!!
