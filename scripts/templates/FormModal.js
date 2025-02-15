import * as ModalAccessibility from '../utils/modalAccessibility.js'
import {
    CreaE, QS, SetAt, ApC, EById,
} from '../utils/domUtils.js'

export default class FormModal {
    constructor(photographerName) {
        this.photographerName = photographerName
        this.$wrapperForm = CreaE('div')
        SetAt('modal', this.$wrapperForm)
        this.wrapperModal = EById('contact_modal')
        this.wrapperModal.setAttribute('aria-labelledBy', 'formTitle')
    }

    //* ******************** DISPLAY MESSAGES  ***********************************/
    // clear validation message
    clearValidationMessage(element) {
        element.closest('.formData').setAttribute('data-error-visible', 'false')
        element.closest('.formData').setAttribute('data-error', '')
    }

    // set validation message
    setValidationMessage(element, message) {
        element.closest('.formData').setAttribute('data-error-visible', 'true')
        element.closest('.formData').setAttribute('data-error', message)
    }

    //* ******************** CHECK FUNCTIONS  ***********************************/
    // check names function
    namesCheck(name) {
        if (!(/^[a-zA-Z]{2,}$/.test((name.value))) || name === '') {
            this.setValidationMessage(name, 'Veuillez saisir des lettres seulement !')
            return false
        }
        this.clearValidationMessage(name)
        return true
    }

    // check email function
    emailCheck(email) {
        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value)) || email === '') {
            this.setValidationMessage(email, 'Veuillez saisir une adresse e-mail valide !')
            return false
        }
        this.clearValidationMessage(email)
        return true
    }

    //* ******************** FORM VALIDATION  ***********************************/
    formValidation(firstName, lastName, email, modalSubmit, formContent) {
        // check all fields
        if (this.namesCheck(firstName) && this.namesCheck(lastName) && this.emailCheck(email)) {
            this.clearValidationMessage(modalSubmit)
            // display json in logs
            const data = new FormData(formContent)
            const value = Object.fromEntries(data.entries())
            // eslint-disable-next-line no-console
            console.log("/*********** Form's Datas ***********/\n", value, '\n/**********************************/')
            this.clearForm(formContent, closeModal)
            return true
        }
        // display required message
        this.setValidationMessage(modalSubmit, 'Veuillez compléter les champs obligatoires !')
        return false
    }

    // form reset
    clearForm(formContent) {
        formContent.style.display = 'block'
        formContent.reset()
        ModalAccessibility.onCloseContactModal(EById('contact_modal'))
    }

    // Events handler
    handleEvents() {
        // DOM $Wrapper
        const form = this.$wrapperForm
        // Modal
        const modal = EById('contact_modal')
        // Buttons
        const contactButton = QS('.contact_button')
        const modalSubmit = QS('.submit_button', form)
        const closeModal = QS('#closeModal', form)
        // Form & Success
        const formContent = QS('#contactForm', form)
        // Fileds
        const firstName = QS('#first', form)
        const lastName = QS('#last', form)
        const email = QS('#email', form)

        //* ******************** EVENTS ***********************************/
        modalSubmit.addEventListener('click', () => {
            this.formValidation(firstName, lastName, email, modalSubmit, formContent)
        })
        contactButton.addEventListener('click', () => {
            ModalAccessibility.onOpenContactModal(modal)
            firstName.focus()
        })
        closeModal.addEventListener('click', () => {
            this.clearForm(formContent, closeModal)
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
        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal.click()
                event.preventDefault()
            }
        })
        modal.style.display = 'none'
        ModalAccessibility.onEnterClick(modalSubmit)
        ModalAccessibility.onEnterClick(closeModal)
        ModalAccessibility.onEscapeClick(modal)
    }

    getFormRender() {
        // DOM Wrapper Generate the form
        this.$wrapperForm.innerHTML = `
                        <header> 
                            <h2 id="formTitle">Contactez-moi ${this.photographerName}</h2>
                            <img id="closeModal" role="button" src="assets/icons/close.svg" alt="Fermer le formulaire de contacte" tabindex="1" />
                        </header>
                        <form  id="contactForm" action="photographer.html" onsubmit="return formValidation();" novalidate>
                            <!-- First Name -->
                            <div class="formData">
                                <label id="firstLabel" for="first">Prénom</label><br>
                                <input class="text-control" type="text" id="first" name="first" placeholder="Entrer votre prénom" 
                                aria-labelledBy="firstLabel"/><br>
                            </div>
                            <!-- Last Name -->
                            <div class="formData">
                                <label id="lastLabel" for="last">Nom</label><br>
                                <input class="text-control" type="text" id="last" name="last" placeholder="Entrer votre nom" 
                                aria-labelledBy="lastLabel"/><br>
                            </div>
                            <!-- Email -->
                            <div class="formData">
                                <label id="emailLabel" for="email">E-mail</label><br>
                                <input class="text-control" type="email" id="email" name="email" placeholder="Entrer votre email" 
                                aria-labelledBy="emailLabel"/><br>
                            </div>
                            <!-- Message -->
                            <div class="formData">
                                <label id="messageLabel" for="message">Message</label><br>
                                <textarea class="text-control" id="message" name="message" rows="3" cols="50" placeholder="Entrer votre message" 
                                aria-labelledBy="messageLabel"></textarea><br>
                            </div>
                            <div class="formData">
                                <input role="button" type="button" class="contact_button submit_button button" value="Envoyer"
                                aria-label="Envoyer votre message" />
                            </div>
                        </form>`

        this.handleEvents()
        ApC(this.$wrapperForm, this.wrapperModal)
    }
}
