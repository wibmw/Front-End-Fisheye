import * as ModalAccessibility from '../utils/modalAccessibility.js'

export default class MediaCard {
    constructor(media) {
        const {
            id, title, likes, date, price, mediaLink, mediaType, position,
        } = media
        this.id = id
        this.title = title
        this.likes = likes
        this.date = date
        this.price = price
        this.mediaType = mediaType
        this.mediaLink = mediaLink
        this.position = position

        this.$wrapperMedia = document.createElement('article')
        this.$wrapperMedia.setAttribute('name', `item-${position}`)
        this.wrapperMedia = document.querySelector('.photograph_media')
    }

    // Events handler
    mediaEventsHandler() {
        // DOM $Wrapper
        const media = this.$wrapperMedia
        const likes = media.querySelector('.likes')
        const icone = likes.closest('i')
        let box

        // Buttons
        if (this.mediaType === 'ImageM') {
            box = media.querySelector('img')
        } else if (this.mediaType === 'VideoM') {
            box = media.querySelector('.playMask')
        }

        //* ******************** EVENTS ***********************************/
        box.addEventListener('click', () => {
            const item = document.querySelector(`li[name="item-${this.position}"]`)
            this.mediaType === 'ImageM' ? item.setAttribute('class', 'active-item') : item.setAttribute('class', 'active-item-video')
            ModalAccessibility.onOpenLightboxModal()
            document.querySelector('#close').focus()
        })
        ModalAccessibility.onEnterClick(box)

        // Likes management
        icone.addEventListener('click', () => {
            const totalLikes = document.querySelector('.totalLikes')
            if (this.likes == likes.textContent) {
                likes.textContent = parseInt(likes.textContent) + 1
                totalLikes.textContent = parseInt(totalLikes.textContent) + 1
                icone.classList.add('active-heart')
            } else {
                likes.textContent = parseInt(likes.textContent) - 1
                totalLikes.textContent = parseInt(totalLikes.textContent) - 1
                icone.classList.remove('active-heart')
            }
        })
    }

    getMediaCardDOM() {
    // Generate the media cards
        let media = ''
        const index = this.position + 6
        if (this.mediaType === 'ImageM') {
            media = `<img src="${this.mediaLink}" alt="${this.title}, closeup view" tabindex="${index}" aria-label="Photo de ${this.title}"> `
        } else if (this.mediaType === 'VideoM') {
            media = `<video class="player" aria-disabled="true" tabindex="-1">
                        <source src="${this.mediaLink}" type="video/mp4" />
                    </video>
                    <div class="playMask" tabindex="${index}" aria-label="${this.title}, closeup view" aria-label="Video de ${this.title}">
                    </div>`
        }

        media += `<div>
                    <h3 tabindex="${index}">${this.title}</h3>
                    <i class="fas fa-heart" aria-label="likes"><div class="likes" tabindex="${index}" >${this.likes}</div> </i>
                 </div>`

        this.$wrapperMedia.innerHTML = media
        this.mediaEventsHandler()
        this.wrapperMedia.appendChild(this.$wrapperMedia)

       /* const player = new Plyr('video', { captions: { active: true } })
        window.player = player */
    }
}
