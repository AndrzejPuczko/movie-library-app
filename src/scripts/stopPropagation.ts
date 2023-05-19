import { trailer } from './trailer'

class Propagation {
	movieContentHeader = document.querySelector<HTMLDivElement>('.movie__content-img')!
	movieContentPoster = document.querySelector<HTMLImageElement>('.movie-poster')!
	movieContentOverview = document.querySelector<HTMLParagraphElement>('.movie__content-description')!
	contentBox = document.querySelector<HTMLDivElement>('.movie__content-box')!

	stopPropagation = () => {
		const element = [this.movieContentHeader, this.movieContentPoster, this.movieContentOverview, this.contentBox, trailer.videoModule]
		element.forEach(item =>
			item.addEventListener('click', e => {
				e.stopPropagation()
			})
		)
	}
}

const stopPropagation = new Propagation()
stopPropagation.stopPropagation()
