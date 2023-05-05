import { MovieData } from './types'
import { closeSearchMobile } from './nav'
import { header, API_KEY } from './header'

class Search {
	searchInput = document.querySelector<HTMLInputElement>('.search-box')!
	searchBtn = document.querySelector<HTMLButtonElement>('.search')!
	mainTitle = document.querySelector<HTMLHeadingElement>('.main__title h2')!

	getSearchMovies = async () => {
		const searchResult = this.searchInput.value.replace(/ /g, '+')
		const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL&query=${searchResult}`)
		const jsonData: MovieData = await response.json()
		const movies = jsonData.results
		return movies
	}

	addSearchTitle = () => {
		this.mainTitle.textContent = this.searchInput.value
	}

	setSearchEngineToDefault = () => {
		this.searchInput.value = ''
		window.scrollTo(0, 0)
	}

	showFoundMovies = () => {
		this.addSearchTitle()
		header.hideHeaderContainer()
		this.setSearchEngineToDefault()
		closeSearchMobile()
	}
}

export const search = new Search()
