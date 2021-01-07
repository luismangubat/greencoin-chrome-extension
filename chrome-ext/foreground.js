// Foreground Script
function logStorage() {
  if(chrome.storage) {
      chrome.storage.local.get(function(data){
          console.log("chrome.storage.local:");
          chrome.runtime.sendMessage({message: "productName"})
          if(chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
          } else {
              console.log(data);
          }
      });
  } else {
      console.warn("chrome.storage is not accessible, check permissions");
  }
}

fetch(chrome.extension.getURL('/donate.html'))
  .then(response => response.text())
  .then(data => {
      const currentProduct = document.getElementById("productTitle").innerHTML.trim();
      chrome.storage.local.set({"productName": currentProduct});
      document.querySelector('#priceblock_ourprice_row').innerHTML =  data; 
      console.log('HTML is being injected')
      chrome.runtime.sendMessage({message: "productName"})
      logStorage();
      // other code
      // eg update injected elements,
      // add event listeners or logic to connect to other parts of the app

      // Variables     
      const donateBtn = document.getElementById('donate-button')
      const progressBar = document.getElementById('progress-bar')
      const openModalButtons = document.querySelectorAll('[data-modal-target]')
      const closeModalButtons = document.querySelectorAll('[data-close-button]')
      const overlay = document.getElementById('overlay')
      // Donation Function
      donateBtn.addEventListener("click", () =>{
        console.log("Donate is clicked")
        progressBar.value += 1;
        // Within a content script:
        openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget)
                openModal(modal)
            })
            })
            overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active')
            modals.forEach(modal => {
                closeModal(modal)
            })
            })

            closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal')
                closeModal(modal)
            })
            })

            function openModal(modal) {
            if (modal == null) return
            modal.classList.add('active')
            overlay.classList.add('active')
            }

            function closeModal(modal) {
            if (modal == null) return
            modal.classList.remove('active')
            overlay.classList.remove('active')
            }




        

    })
  }).catch(err => {
      // handle error
});
