export interface Movie {
	adult: boolean
	backdrop_path: string | null
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string | null
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface MovieData {
	page: number
	results: [Movie]
	total_pages: number
	total_results: number
}

interface Video {
	id: string
	iso_639_1: string
	iso_3166_1: string
	key: string
	name: string
	official: boolean
	published_at: string
	site: string
	size: number
	type: string
}

export interface VideoData {
	id: number
	results: [Video]
}
