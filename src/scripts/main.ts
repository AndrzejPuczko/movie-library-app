import './../styles/style.scss'
import './header'
import './nav'
import './footer'
import './stopPropagation'
import { genreLabels } from './labels'
import { Movie } from './types'
import { header, randomMovie } from './header'
import { search } from './search'
import { trailer } from './trailer'

let movies: Movie[]

class Main {
	title = document.querySelector<HTMLHeadingElement>('.main__title h2')!
	moviesContainer = document.querySelector<HTMLDivElement>('.main__movies')!
	movieContent = document.querySelector<HTMLDivElement>('.movie__content')!
	movieContentBtn = document.querySelector<HTMLDivElement>('.movie__content-btn')!
	movieContentHeader = document.querySelector<HTMLDivElement>('.movie__content-img')!
	movieContentPoster = document.querySelector<HTMLImageElement>('.movie-poster')!
	movieContentTitle = document.querySelector<HTMLHeadingElement>('.movie-title')!
	movieContentGenre = document.querySelector<HTMLParagraphElement>('.movie-genre')!
	movieContentRating = document.querySelector<HTMLSpanElement>('.rating')!
	movieContentRelease = document.querySelector<HTMLSpanElement>('.release-date span')!
	movieContentOriginalTitle = document.querySelector<HTMLParagraphElement>('.original-title')!
	movieContentOverview = document.querySelector<HTMLParagraphElement>('.movie__content-description')!
	readMore = document.querySelector<HTMLButtonElement>('.read__more')!
	newsLink = document.querySelector<HTMLMenuElement>('.news-link')!
	navLogo = document.querySelector<HTMLMenuElement>('.nav__logo')!
	videoBtn = document.querySelector<HTMLButtonElement>('.video-button')!
	closeBtn = document.querySelector<HTMLButtonElement>('.close-button')!

	getMovieNews = async () => {
		movies = await header.getMovies()
		main.addMoviesToContainer()
	}

	getFoundMovies = async () => {
		if (!search.searchInput.value.trim()) {
			search.showErrorMessage()
		} else {
			movies = await search.getSearchMovies()
			search.showFoundMovies()
			search.clearErrorMessage()
			main.addMoviesToContainer()
			if (movies.length === 0) {
				this.title.textContent = 'Nie znaleziono szukanego filmu'
			}
		}
	}

	openMoreInfoModule = (id: number) => {
		this.setImagesToModule(id)
		this.addTextsToModule(id)
		this.getMovieIdForTrailer(id)
		this.openModule()
	}

	addMoviesToContainer = () => {
		main.moviesContainer.innerHTML = ''
		for (const movieId in movies) {
			const movieItem = document.createElement('div')
			movieItem.classList.add('movie__item')
			movieItem.setAttribute('id', movieId)

			if (movies[movieId].poster_path !== null) {
				movieItem.innerHTML = `<div class="movie__item-img">
				<img src="https://image.tmdb.org/t/p/w342/${movies[movieId].poster_path}" alt="${movies[movieId].title}"></div>
				<div class="movie__item-title"><h4>${movies[movieId].title}</h4></div>
				<div class="movie__item-genre"><p>${this.convertIdToCategory(Number(movieId)).slice(0, -3)}</p></div>
				<div class="movie__item-rating"><p><i class="fa-solid fa-star"></i><span>${movies[movieId].vote_average}</span></p></div>`
				main.moviesContainer.append(movieItem)
			}
		}
	}

	setImagesToModule = (id: number) => {
		main.movieContentHeader.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${movies[id].backdrop_path}")`
		main.movieContentPoster.setAttribute('src', `https://image.tmdb.org/t/p/w342/${movies[id].poster_path}`)
		main.movieContentPoster.setAttribute('alt', `${movies[id].title}`)
	}

	addTextsToModule = (id: number) => {
		main.movieContentTitle.textContent = movies[id].title
		main.movieContentRating.textContent = movies[id].vote_average.toString()
		main.movieContentRelease.textContent = movies[id].release_date
		main.movieContentOriginalTitle.textContent = movies[id].original_title
		main.movieContentOverview.textContent = movies[id].overview
		main.movieContentGenre.textContent = main.convertIdToCategory(id).slice(0, -3)
	}

	openModule = () => {
		main.movieContent.style.transform = 'translateY(0)'
		document.body.classList.add('disable-scroll')
	}

	closeModule = () => {
		main.movieContent.style.transform = 'translateY(150%)'
		document.body.classList.remove('disable-scroll')
	}

	closeModuleByDrag = () => {
		const startY = 200
		main.movieContentHeader.addEventListener('touchmove', function ({ touches }) {
			const currentY = touches[0].clientY

			if (currentY > startY) {
				main.movieContent.style.transform = 'translateY(150%)'
				setTimeout(() => {
					document.body.classList.remove('disable-scroll')
				}, 300)
			}
		})
	}

	checkMovieId = ({ target }: MouseEvent) => {
		const movie = target as HTMLElement
		const movieId = Number(movie.id)
		main.openMoreInfoModule(movieId)
	}

	getMovieIdForTrailer = (id: number) => {
		trailer.movieId = movies[id].id.toString()
	}

	convertIdToCategory = (movieId: number) => {
		let genreArr = movies[movieId].genre_ids.slice(0, 3)
		let genre = ''
		for (const genreId of genreArr) {
			if (genreLabels[genreId]) {
				genre += `${genreLabels[genreId]} | `
			}
		}
		return genre
	}

	returnToDefaultState = () => {
		this.title.textContent = 'NOWOŚCI FILMOWE'
		header.headerArea.style.height = ''
		header.headerContainer.style.display = 'flex'
		this.getMovieNews()
	}
}

const main = new Main()
main.getMovieNews()

main.newsLink.addEventListener('click', main.returnToDefaultState)
main.navLogo.addEventListener('click', main.returnToDefaultState)
main.moviesContainer.addEventListener('click', main.checkMovieId)
main.movieContentBtn.addEventListener('click', main.closeModule)
main.movieContentHeader.addEventListener('touchstart', main.closeModuleByDrag)
main.movieContent.addEventListener('click', main.closeModule)
main.readMore.addEventListener('click', () => main.openMoreInfoModule(randomMovie))
main.videoBtn.addEventListener('click', () => trailer.openVideoModule(trailer.movieId))
main.closeBtn.addEventListener('click', trailer.closeVideoModule)
search.searchBtn.addEventListener('click', main.getFoundMovies)
search.searchInput.addEventListener('keypress', ({ key }) => {
	if (key === 'Enter') {
		main.getFoundMovies()
	}
})
document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		main.closeModule()
		trailer.closeVideoModule()
	}
})
