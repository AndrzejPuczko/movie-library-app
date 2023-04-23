import './../scss/style.scss'
import { genreLabels } from './labels'
import { Movie, MovieData } from './types'

const navBtn = document.querySelector('.hamburger') as HTMLButtonElement
const navMobile = document.querySelector('.nav__mobile') as HTMLMenuElement
const navMobileLinks = document.querySelectorAll('.nav__mobile-item')
const searchBtn = document.querySelector('.nav__search-btn') as HTMLButtonElement
const searchNav = document.querySelector('.nav__search') as HTMLButtonElement
const newsLink = document.querySelector('.news-link') as HTMLMenuElement

const header = document.querySelector('.header') as HTMLElement
const headerContainer = document.querySelector('.header__container') as HTMLElement
const headerTitle = document.querySelector('.header__title h1') as HTMLElement
const headerRating = document.querySelector('.header__rating p span') as HTMLElement
const headerText = document.querySelector('.header__description p') as HTMLElement
const readMore = document.querySelector('.read__more') as HTMLButtonElement

const main = document.querySelector('.main') as HTMLDivElement
const mainTitle = document.querySelector('.main__title h2') as HTMLHeadElement
const mainMovies = document.querySelector('.main__movies') as HTMLDivElement
const movieContent = document.querySelector('.movie__content') as HTMLDivElement
const movieContentBtn = document.querySelector('.movie__content-btn') as HTMLDivElement
const movieContentHeader = document.querySelector('.movie__content-img') as HTMLDivElement
const movieContentPoster = document.querySelector('.movie-poster') as HTMLImageElement
const movieContentTitle = document.querySelector('.movie-title') as HTMLHeadingElement
const movieContentGenre = document.querySelector('.movie-genre') as HTMLParagraphElement
const movieContentRating = document.querySelector('.rating') as HTMLSpanElement
const movieContentRelease = document.querySelector('.release-date span') as HTMLSpanElement
const movieContentOriginal = document.querySelector('.original-title') as HTMLParagraphElement
const movieContentOverview = document.querySelector('.movie__content-description') as HTMLParagraphElement

const searchInput = document.querySelector('.search-box') as HTMLInputElement
const search = document.querySelector('.search') as HTMLButtonElement

const API_KEY = '34f4ec51c1e003e1390c3950c553afc7'
const randomMovie = Math.floor(Math.random() * 20)
const currentYear = new Date().getFullYear()

let searchResult: string
let headerImgWidth: string
let movies: Movie[]

function checkScreenWidth() {
	if (window.innerWidth > 780) {
		headerImgWidth = 'original'
	} else {
		headerImgWidth = 'w780'
	}
}
checkScreenWidth()

async function moviesLoading() {
	let response
	if (main.classList.contains('--search-result')) {
		response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL&query=${searchResult}`)
	} else {
		response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL&sort_by=popularity.desc&page=1&year=${currentYear}&with_watch_monetization_types=flatrate`
		)
	}
	const jsonData: MovieData = await response.json()
	movies = jsonData.results
	return movies
}

async function headerLoading() {
	await moviesLoading()
	const linearGradient = 'linear-gradient(to right, rgba(0, 0, 0, 0.829) 20%, rgba(0, 0, 0, 0) 110%),'

	header.style.backgroundImage = `${linearGradient} url("https://image.tmdb.org/t/p/${headerImgWidth}/${movies[randomMovie].backdrop_path}")`
	headerTitle.textContent = movies[randomMovie].title
	headerRating.textContent = movies[randomMovie].vote_average.toString()
	headerText.textContent = movies[randomMovie].overview.slice(0, 160) + '...'
}
headerLoading()

function categoryConversion(movieId: number) {
	let genreArr: number[] = movies[movieId].genre_ids.slice(0, 3)
	let genre = ''
	for (const genreId of genreArr) {
		if (genreLabels[genreId]) {
			genre += genreLabels[genreId] + ' | '
		}
	}
	return genre
}

async function contentLoading() {
	await moviesLoading()
	mainMovies.innerHTML = ''

	for (const movieId in movies) {
		const movieItem = document.createElement('div')
		movieItem.classList.add('movie__item')
		movieItem.setAttribute('id', movieId)

		if (movies[movieId].poster_path !== null) {
			movieItem.innerHTML = `<div class="movie__item-img">
			<img src="https://image.tmdb.org/t/p/w342/${movies[movieId].poster_path}" alt="${movies[movieId].title}">
			</div>
			<div class="movie__item-title">
				<h4>${movies[movieId].title}</h4>
			</div>
			<div class="movie__item-genre">
				<p>${categoryConversion(+movieId).slice(0, -3)}</p>
			</div>
			<div class="movie__item-rating">
				<p><i class="fa-solid fa-star"></i><span>${movies[movieId].vote_average}</span></p>
			</div>`

			mainMovies.append(movieItem)
		}
	}
}
contentLoading()

async function openMovieContent(id: number) {
	await moviesLoading()

	movieContentHeader.style.backgroundImage = `url("https://image.tmdb.org/t/p/${headerImgWidth}/${movies[id].backdrop_path}")`
	movieContentPoster.setAttribute('src', `https://image.tmdb.org/t/p/w342/${movies[id].poster_path}`)
	movieContentTitle.textContent = movies[id].title
	movieContentRating.textContent = movies[id].vote_average.toString()
	movieContentRelease.textContent = movies[id].release_date
	movieContentOriginal.textContent = movies[id].original_title
	movieContentOverview.textContent = movies[id].overview
	movieContentGenre.textContent = categoryConversion(id).slice(0, -3)
	movieContent.style.transform = 'translateY(0)'
	document.body.classList.add('disable-scroll')
}

function findYourMovie() {
	if (searchInput.value !== '') {
		searchNav.classList.remove('--active')
		navBtn.classList.remove('is-active')
		document.body.classList.remove('disable-scroll')
		main.classList.add('--search-result')
		mainTitle.textContent = searchInput.value
		header.style.height = '60px'
		headerContainer.style.display = 'none'
		searchResult = searchInput.value.replace(/ /g, '+')
		contentLoading()
		searchInput.value = ''
		window.scrollTo(0, 0)
	}
}

const closeMovieContentByDrag = () => {
	const startY = 200
	movieContentHeader.addEventListener('touchmove', function ({ touches }) {
		const currentY = touches[0].clientY

		if (currentY > startY) {
			movieContent.style.transform = 'translateY(100%)'
			setTimeout(() => {
				document.body.classList.remove('disable-scroll')
			}, 300)
		}
	})
}

navBtn.addEventListener('click', () => {
	if (searchNav.classList.contains('--active')) {
		searchNav.classList.remove('--active')
		navBtn.classList.remove('is-active')
		document.body.classList.remove('disable-scroll')
	} else {
		navMobile.classList.toggle('--active')
		navBtn.classList.toggle('is-active')
		document.body.classList.toggle('disable-scroll')
	}
})

searchBtn.addEventListener('click', () => {
	searchNav.classList.toggle('--active')
	navBtn.classList.toggle('is-active')
	document.body.classList.toggle('disable-scroll')
})

mainMovies.addEventListener('click', ({ target }: MouseEvent) => {
	const movie = target as HTMLElement
	const movieId = +movie.id
	openMovieContent(movieId)
})

movieContentBtn.addEventListener('click', () => {
	movieContent.style.transform = 'translateY(100%)'
	document.body.classList.remove('disable-scroll')
})

search.addEventListener('click', findYourMovie)

searchInput.addEventListener('keypress', ({ key }) => {
	if (key === 'Enter' && searchInput.value !== '') {
		findYourMovie()
	}
})

navMobileLinks.forEach(item => {
	item.addEventListener('click', () => {
		document.body.classList.remove('disable-scroll')
		navMobile.classList.remove('--active')
		navBtn.classList.remove('is-active')
	})
})

newsLink.addEventListener('click', () => {
	main.classList.remove('--search-result')
	mainTitle.textContent = 'NOWOŚCI FILMOWE'
	header.style.height = ''
	headerContainer.style.display = 'flex'
	contentLoading()
})

movieContentHeader.addEventListener('touchstart', closeMovieContentByDrag)

readMore.addEventListener('click', async () => {
	try {
		await openMovieContent(randomMovie)
	} catch (error) {
		console.error('Error opening movie content:', error)
	}
})
