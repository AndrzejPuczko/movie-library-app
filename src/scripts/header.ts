const apiArrayLength = 20
export const randomMovie = Math.floor(Math.random() * apiArrayLength)

class Header {
	header = document.querySelector<HTMLElement>('.header')!
	headerContainer = document.querySelector<HTMLElement>('.header__container')!
	headerTitle = document.querySelector<HTMLHeadingElement>('.header__title h1')!
	headerRating = document.querySelector<HTMLSpanElement>('.header__rating p span')!
	headerText = document.querySelector<HTMLParagraphElement>('.header__description p')!
	readMore = document.querySelector<HTMLButtonElement>('.read__more')!


}

export const header = new Header()
