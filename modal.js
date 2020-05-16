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

