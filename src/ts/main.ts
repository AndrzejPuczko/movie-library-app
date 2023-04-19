import './../scss/style.scss'
import { genreLabels } from './labels'
import { Movie, MovieData } from './types'

// nav

const navBtn = document.querySelector('.hamburger') as HTMLButtonElement
const navMobile = document.querySelector('.nav__mobile') as HTMLMenuElement
const searchBtn = document.querySelector('.nav__search-btn') as HTMLButtonElement
const searchNav = document.querySelector('.nav__search') as HTMLButtonElement

// header

const header = document.querySelector('.header') as HTMLElement
const headerTitle = document.querySelector('.header__title h1') as HTMLElement
const headerRating = document.querySelector('.header__rating p span') as HTMLElement
const headerText = document.querySelector('.header__description p') as HTMLElement

// content
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

//
const randomNum = Math.floor(Math.random() * 20)
let headerImgWidth: string
let movies: Movie[]
//
const API_KEY = '34f4ec51c1e003e1390c3950c553afc7'

// ///////////////////
function checkScreenWidth() {
	if (window.innerWidth > 780) {
		headerImgWidth = 'original'
	} else {
		headerImgWidth = 'w780'
	}
}
checkScreenWidth()

async function LoadingMovieNews() {
	const response = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL&sort_by=popularity.desc&page=1&year=2023&with_watch_monetization_types=flatrate`
	)
	const jsonData: MovieData = await response.json()

	movies = jsonData.results
	return movies

	// console.log(movies[5].backdrop_path)
	// console.log(zmienna)
	// let number = 11
	// const img = jsonData.results[number].poster_path
	// console.log(jsonData.results[number].vote_average)
	// console.log(jsonData.results[number].overview)
	// if (img === null) {
	// 	console.log('nie tworzyć obiektu')
	// } else {
	// 	document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${img})`
	// }
}

async function headerLoading() {
	await LoadingMovieNews()
	const linearGradient = 'linear-gradient(to right, rgba(0, 0, 0, 0.829) 20%, rgba(0, 0, 0, 0) 110%),'

	header.style.backgroundImage = `${linearGradient} url("https://image.tmdb.org/t/p/${headerImgWidth}/${movies[randomNum].backdrop_path}")`
	headerTitle.textContent = movies[randomNum].title
	headerRating.textContent = movies[randomNum].vote_average.toString()
	headerText.textContent = movies[randomNum].overview.slice(0, 160) + '...'
}
headerLoading()

async function newsLoading() {
	await LoadingMovieNews()
	console.log(movies)

	for (const movieId in movies) {
		const movieItem = document.createElement('div')
		movieItem.classList.add('movie__item')
		movieItem.setAttribute('id', movieId)

		let genreArr: number[] = movies[movieId].genre_ids.slice(0, 3)
		let genre = ''
		for (const genreId of genreArr) {
			if (genreLabels[genreId]) {
				genre += genreLabels[genreId] + ' | '
			}
		}

		movieItem.innerHTML = `<div class="movie__item-img">
		<img src="https://image.tmdb.org/t/p/w342/${movies[movieId].poster_path}" alt="${movies[movieId].title}">
	  </div>
	  <div class="movie__item-title">
		<h4>${movies[movieId].title}</h4>
	  </div>
	  <div class="movie__item-genre">
		<p>${genre.slice(0, -3)}</p>
	  </div>
	  <div class="movie__item-rating">
		<p><i class="fa-solid fa-star"></i><span>${movies[movieId].vote_average}</span></p>
	  </div>`
		mainMovies.append(movieItem)
	}
}
newsLoading()

async function openMovieContent(id: number) {
	await LoadingMovieNews()

	movieContentHeader.style.backgroundImage = `url("https://image.tmdb.org/t/p/${headerImgWidth}/${movies[id].backdrop_path}")`
	movieContentPoster.setAttribute('src', `https://image.tmdb.org/t/p/w342/${movies[id].poster_path}`)
	movieContentTitle.textContent = movies[id].title

	movieContentRating.textContent = movies[id].vote_average.toString()
	movieContentRelease.textContent = movies[id].release_date
	movieContentOriginal.textContent = movies[id].original_title
	movieContentOverview.textContent = movies[id].overview

	movieContent.style.transform = 'translateY(0)'
}

// const movieContentGenre = document.querySelector('.movie-genre') as HTMLParagraphElement

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
	const movieId = parseInt(movie.id)
	openMovieContent(movieId)
})

movieContentBtn.addEventListener('click', () => {
	movieContent.style.transform = 'translateY(100%)'
})
