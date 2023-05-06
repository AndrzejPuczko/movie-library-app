import { API_KEY } from './header'
import { VideoData } from './types'

class Trailer {
	videoSrc = document.querySelector<HTMLIFrameElement>('.video-frame')!
	videoModule = document.querySelector<HTMLDivElement>('.movie__content-trailer')!
	movieId = ''

	getVideo = async (id: string) => {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
		const jsonData: VideoData = await response.json()
		return jsonData.results
	}

	openVideoModule = (id: string) => {
		this.getVideoKey(id)
		this.videoModule.style.display = 'flex'
	}

	closeVideoModule = () => {
		this.removeVideoLink()
		this.videoModule.style.display = 'none'
	}

	getVideoKey = async (id: string) => {
		const video = await this.getVideo(id)
		for (const trailer of video) {
			if (trailer.type === 'Trailer') {
				this.addVideoLink(trailer.key)
				return
			}
		}
		return null
	}

	addVideoLink = (trailer: string) => {
		this.videoSrc.setAttribute('src', `https://youtube.com/embed/${trailer}`)
	}

	removeVideoLink = () => {
		this.videoSrc.setAttribute('src', '')
	}
}

export const trailer = new Trailer()
