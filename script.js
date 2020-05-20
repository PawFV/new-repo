function init() {
   "use strict"
   let titleOne = document.getElementById('description');
   let titleTwo = document.getElementById('description2');
   titleOne.innerHTML = "";
   titleTwo.innerHTML = "";

   // Plays audio onload.
   (() => {
      let keyboardAudio = document.getElementById('keyboardAudio');
      keyboardAudio.play();
   })()

   let titleOneIndex = 0;
   (function typeTitle() {
      let titleOneText = `Hi I'm Paw...`

      if (titleOneIndex < titleOneText.length) {
         titleOne.innerHTML += titleOneText.charAt(titleOneIndex);
         titleOneIndex++;
         setTimeout(typeTitle, 120);
      } else typeDescription();
   })()

   let titleTwoIndex = 0;

   function typeDescription() {

      let titleTwoText = `I'm fullstack web developer;`;

      if (titleTwoIndex < titleTwoText.length) {
         titleTwo.innerHTML += titleTwoText.charAt(titleTwoIndex);
         titleTwoIndex++;
         setTimeout(typeDescription, 85);
      }
   }
}

window.addEventListener('load', init)