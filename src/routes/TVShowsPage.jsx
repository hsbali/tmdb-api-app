import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	getTvShowsInCarousel,
	clearCarouselsWithItems,
} from '../actions/discover.action'
import ContentCarousel from '../components/ContentCarousel'

const TVShowsPage = () => {
	const dispatch = useDispatch()

	const pageCarousels = useSelector(
		(state) => state.discover.carouselsWithItems
	)

	const carousels = {
		popularTVShows: {
			name: 'Popular TV Shows',
			itemType: 'tv',
			key: 'popularTVShows',
		},
		topRatedTVShows: {
			name: 'Top Rated TV Shows',
			itemType: 'tv',
			key: 'topRatedTVShows',
		},
	}

	const requestOtions = {
		topRatedTVShows: {
			sort_by: 'vote_average.desc',
		},
	}

	useEffect(() => {
		dispatch(
			getTvShowsInCarousel(
				carousels.topRatedTVShows,
				requestOtions.topRatedTVShows
			)
		)
		dispatch(getTvShowsInCarousel(carousels.popularTVShows))
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

export default TVShowsPage
