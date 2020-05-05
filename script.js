let title = document.getElementById('description');
let description = document.getElementById('description2');
title.innerHTML = "";
description.innerHTML = "";

var i = 0;
(function typeTitle() {
   let txt = `Hi I'm Paw...`

   if (i < txt.length) {
      title.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeTitle, 120);
   } else typeDescription();
})()

var j = 0;
function typeDescription() {

   let descr = `I'm web developer and UX/UI designer;`;
   if (j < descr.length) {
      description.innerHTML += descr.charAt(j);
      j++;
      setTimeout(typeDescription, 85);
   }
}
