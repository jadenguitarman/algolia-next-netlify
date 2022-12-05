import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { NetlifyLogo, AlgoliaLogo } from '../components/logos.js';
import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	InfiniteHits,
	RefinementList,
	SearchBox
} from 'react-instantsearch-hooks-web';
import Cookies from "js-cookie";

const searchClient = algoliasearch(
	'RZJ1O8RUTF',
	'606fa9aab3ada0786376ca8fff4700a6'
);

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
	window.coords = Cookies.get('currentCoords');
	navigator.serviceWorker.register(`/sw.js`);

	const channel = new BroadcastChannel('coords-channel');
	channel.postMessage({
		type: "set-coords",
		coords
	});
}

const Hit = ({ hit }) => (
	<div className={styles.hit}>
		<span className={styles.hitName}>{hit.name}</span>
		<span className={styles.hitCuisine}>{hit.cuisine} food</span>
		<span className={styles.hitPrice}>About ${hit.averageEntreePrice} per entree</span>
	</div>
);

const Home = () => (
	<>
		<Head>
			<title>Find a Restaurant</title>
			<meta name="description" content="Find a Restaurant" />
		</Head>

		<main className={styles.main}>
			<h1>Find a Restaurant</h1>

			<InstantSearch
				searchClient={searchClient}
				indexName="restaurants"
			>

				<SearchBox
					placeholder="Search by restaurant name"
					autoFocus
					className={styles.searchBox}
				/>

				<RefinementList
					attribute="cuisine"
					className={styles.cuisinesList}
				/>

				<InfiniteHits
					showPrevious
					hitComponent={Hit}
					className={styles.hitsContainer}
				/>

				<div className={styles.poweredBy}>
					<NetlifyLogo />
					<AlgoliaLogo />
				</div>

				<span>Template created by <a href="https://jaden.baptista.dev">Jaden Baptista</a> for <a href="/">an article collaboration between Netlify and Algolia</a></span>
			</InstantSearch>
		</main>
	</>
);

export default Home;
