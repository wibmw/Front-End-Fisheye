export class FormModal {
    constructor(photographerName) {
      this._photographerName = photographerName
      this.$wrapperForm = document.createElement("div")
      this.$wrapperForm.setAttribute("class", "modal")
      this._wrapperModal = document.getElementById("contact_modal")  
    }
    //********************* DISPLAY MESSAGES  ***********************************/    
    // clear validation message
    clearValidationMessage(element) {
        element.closest(".formData").setAttribute("data-error-visible", "false");
        element.closest(".formData").setAttribute("data-error", "");
    }
        
    // set validation message
    setValidationMessage(element, message) {
        element.closest(".formData").setAttribute("data-error-visible", "true");
        element.closest(".formData").setAttribute("data-error", message);
    }
        
    //********************* CHECK FUNCTIONS  ***********************************/
    // check names function
    namesCheck(name){
        if (!(/^[a-zA-Z]{2,}$/.test((name.value))) || name === '') {
            this.setValidationMessage(name, "Veuillez saisir des lettres seulement !");
            return false;
        } else {
            this.clearValidationMessage(name);
            return true;
        }
    }
    // check email function
    emailCheck(email){
        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value)) || email === '') {
            this.setValidationMessage(email, "Veuillez saisir une adresse e-mail valide !");
            return false;
        } else {
            this.clearValidationMessage(email);
            return true;
        }
    }      
    
    //********************* FORM VALIDATION  ***********************************/
    formValidation(firstName, lastName, email, modalSubmit, formContent, modalSuccess) {
        // check all fields
        if(this.namesCheck(firstName) && this.namesCheck(lastName) && this.emailCheck(email)){
            this.clearValidationMessage(modalSubmit);
    
            // display json in logs
            const data = new FormData(formContent);
            const value = Object.fromEntries(data.entries());
            console.log("/*********** Form's Datas ***********/")
            console.log({ value });
            console.log("/**********************************/")
            // if all is ok, display success message 
            formContent.style.display="none";
            modalSuccess.style.display="flex";    
        }else{
            // display required message
            this.setValidationMessage(modalSubmit, "Veuillez compléter les champs obligatoires !");
        }
    };
        
        
    // form reset
    clearForm (formContent, modalSuccess, closeModal) {
        formContent.style.display="block";
        formContent.reset();
        modalSuccess.style.display="none";  
        closeModal.click();
    }
    
    // Events handler
    handleEvents() {
        // DOM $Wrapper
        const form = this.$wrapperForm  
        // Modal
        const modal = document.querySelector("#contact_modal")              
        // Buttons
        const contactButton = document.querySelector(".contact_button");   
        const modalSubmit = form.querySelector(".submit_button");   
        const successButton = form.querySelector(".success_button");
        const closeModal = form.querySelector("#closeModal");       
        // Form & Success
        const formContent = form.querySelector("#contactForm");       
        const modalSuccess = form.querySelector("#modalSuccess");    
        // Fileds
        const firstName = form.querySelector("#first");             
        const lastName = form.querySelector("#last");               
        const email = form.querySelector("#email");                
        
        //********************* EVENTS ***********************************/
        modalSubmit.addEventListener("click", () => {
            this.formValidation(firstName, lastName, email, modalSubmit, formContent, modalSuccess)
        })
        successButton.addEventListener("click", () => {
            this.clearForm(formContent, modalSuccess, closeModal)
        })
        contactButton.addEventListener("click", () => {
            modal.style.display = "block";
        })
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        })
        firstName.addEventListener('change', () => {
            this.namesCheck(firstName)
        })
        lastName.addEventListener('change', () => {
            this.namesCheck(lastName)
        })
        email.addEventListener('change', () => {
            this.emailCheck(email)
        })

        firstName.focus()
    }


    getFormRender() {
        // DOM Wrapper Generate the form
        this.$wrapperForm.innerHTML = 
                        `<header> 
                            <h2>Contactez-moi ${this._photographerName}</h2>
                            <img id="closeModal" src="assets/icons/close.svg" alt="Fermer le formulaire de contacte"/>
                        </header>
                        <form  id="contactForm" action="photographer.html" onsubmit="return formValidation();" novalidate>
                            <!-- First Name -->
                            <div class="formData">
                                <label for="first">Prénom</label><br>
                                <input class="text-control" type="text" id="first" name="first" autofocus/><br>
                            </div>
                            <!-- Last Name -->
                            <div class="formData">
                                <label for="last">Nom</label><br>
                                <input class="text-control" type="text" id="last" name="last"/><br>
                            </div>
                            <!-- Email -->
                            <div class="formData">
                                <label for="email">E-mail</label><br>
                                <input class="text-control" type="email" id="email" name="email"/><br>
                            </div>
                            <!-- Message -->
                            <div class="formData">
                                <label for="message">Message</label><br>
                                <textarea class="text-control" type="text" id="message" name="message" rows="3" cols="50"></textarea><br>
                            </div>
                            <div class="formData">
                                <input class="contact_button submit_button button" value="Envoyer"></button>
                            </div>
                        </form>
                        <!-- Modal Success Message -->
                        <div id="modalSuccess">
                            <span>Merci pour <br/>votre message</span>
                            <input class="contact_button success_button button" value="Fermer" />
                        </div>`

      this.handleEvents()
      this._wrapperModal.appendChild(this.$wrapperForm)
    }
}