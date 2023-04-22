import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	getMoviesInCarousel,
	clearCarouselsWithItems,
} from '../actions/discover.action'
import ContentCarousel from '../components/ContentCarousel'

const MoviesPage = () => {
	const dispatch = useDispatch()

	const pageCarousels = useSelector(
		(state) => state.discover.carouselsWithItems
	)

	const carousels = {
		popularMovies: {
			name: 'Popular Movies',
			itemType: 'movie',
			key: 'popularMovies',
		},
		topRatedMovies: {
			name: 'Top Rated Movies',
			itemType: 'movie',
			key: 'topRatedMovies',
		},
	}

	const requestOtions = {
		topRatedMovies: {
			sort_by: 'vote_average.desc',
		},
	}

	useEffect(() => {
		dispatch(getMoviesInCarousel(carousels.popularMovies))
		dispatch(
			getMoviesInCarousel(
				carousels.topRatedMovies,
				requestOtions.topRatedMovies
			)
		)
		return () => dispatch(clearCarouselsWithItems())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<main className="page-content">
			{Object.keys(pageCarousels).map((carouselKey, i) => {
				return (
					<Fragment key={i}>
						<ContentCarousel
							carouselWithItems={pageCarousels[carouselKey]}
						/>
					</Fragment>
				)
			})}
		</main>
	)
}

export default MoviesPage
