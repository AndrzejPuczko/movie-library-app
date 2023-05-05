import { MovieData } from './types'
import { currentYear } from './footer'

const API_KEY = process.env.API_KEY
const apiArrayLength = 20
const randomMovie = Math.floor(Math.random() * apiArrayLength)

class Header {
	headerArea = document.querySelector<HTMLElement>('.header')!
	headerContainer = document.querySelector<HTMLElement>('.header__container')!
	headerTitle = document.querySelector<HTMLHeadingElement>('.header__title h1')!
	headerRating = document.querySelector<HTMLSpanElement>('.header__rating p span')!
	headerText = document.querySelector<HTMLParagraphElement>('.header__description p')!
	apiImgDesktopSize = 'original'
	apiImgMobileSize = 'w780'
	apiImgSize = ''

	getMovies = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL&sort_by=popularity.desc&page=1&year=${currentYear}&with_watch_monetization_types=flatrate`
		)
		const jsonData: MovieData = await response.json()
		return jsonData.results
	}

	getHeaderBackground = async () => {
		const movies = await this.getMovies()
		const linearGradient = 'linear-gradient(to right, rgba(0, 0, 0, 0.829) 20%, rgba(0, 0, 0, 0) 110%)'
		this.headerArea.style.backgroundImage = `${linearGradient}, url("https://image.tmdb.org/t/p/${this.apiImgSize}/${movies[randomMovie].backdrop_path}")`
	}

	getHeaderDescription = async () => {
		const movies = await this.getMovies()
		this.headerTitle.textContent = movies[randomMovie].title
		this.headerRating.textContent = movies[randomMovie].vote_average.toString()
		this.headerText.textContent = movies[randomMovie].overview.slice(0, 160) + '...'
	}

	getScreenInnerWidth = () => {
		if (window.innerWidth > 780) {
			this.apiImgSize = this.apiImgDesktopSize
		} else {
			this.apiImgSize = this.apiImgMobileSize
		}
		this.getHeaderBackground()
	}

	hideHeaderContainer = () => {
		this.headerArea.style.height = '60px'
		this.headerContainer.style.display = 'none'
	}
}

const header = new Header()
header.getScreenInnerWidth()
header.getHeaderDescription()

window.addEventListener('resize', header.getScreenInnerWidth)

export { API_KEY, randomMovie, header }
