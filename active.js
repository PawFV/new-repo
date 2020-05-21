(function activeLink() {
   let activeLinks = document.querySelectorAll('[data-active]');
   const closeForm = document.getElementById('closeForm');
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
         removeAndAddScrollEvent()
         handleLinks(element);
      })
   });

   // CLOSE FORM AND STYLES LAST NAV ELEMENT
   closeForm.addEventListener('click', handleLinks(lastActiveElement))

   function handleLinks(element) {
      activeLinks.forEach(i => i.classList.remove('active'));
      element.classList.add('active');
   }

   function handleScroll() {
      if (portfolio.getBoundingClientRect().y < windowHeightBreakPoint) {
         handleLinks(PORTFOLIO);
         lastActiveElement = PORTFOLIO
      } else {
         handleLinks(ABOUT)
         lastActiveElement = ABOUT
      }
   }

   function removeAndAddScrollEvent() {
      window.removeEventListener('scroll', handleScroll);

      setTimeout(() => {
         window.addEventListener('scroll', handleScroll);
      }, 450);
   }
})()

