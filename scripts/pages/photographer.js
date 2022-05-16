class PhotographerPage {
    

    async displayPhotographerData(photographer) {
        if (photographer) {
            // display Photographer's Info DOM 
            photographerFactory(photographer, 'photograph_info') 
            // display Photographer's picture DOM
            photographerFactory(photographer, 'photograph_picture')
            // display Modal Form DOM
            const form = new FormModal(photographer._name)
            form.getFormRender()
        }
    }

    async displayMediaData(medias, photographer) {
        let likes = 0

        if (medias) {
            // Generate Medias Card
            medias.forEach((media) => {
                mediaFactory(media, photographer._name)
                likes += media.likes
            })
        }

        // display Photographer's price / like DOM
        photographerFactory(photographer, 'photograph_likes', likes)
    }

    async init() {
        // Get photographe's ID from the url
        const id = new URLSearchParams(window.location.search).get('id')
        // Get photographes data
        const apiPhotographer = new PhotographerApi('../data/photographers.json', 'photographers')
        // Get photographe's data by ID
        const photographer = await apiPhotographer.getPhotographer(id)
        // Get Media data
        const apiMedia = new MediaApi('../data/photographers.json', 'media')
        const medias = await apiMedia.getMediaOfPhotographer(id)
        
        this.displayPhotographerData(photographer[0])
        this.displayMediaData(medias, photographer[0])
    }

}

/*const contactButton = document.querySelector(".contact_button");//modal success
const modalContact = document.getElementById("contact_modal");//modal success

// launch modal event
contactButton.addEventListener("click", displayModal());
 
// launch modal form
function displayModal() {
    modalContact.style.display = "block";
}
 
// close modal
function closeModal() {
    modalContact.style.display = "none";
}*/

const page = new PhotographerPage()
page.init()

/*function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}*/