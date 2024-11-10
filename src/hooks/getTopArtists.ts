import { useState, useEffect } from 'react';
import { fetchSpotifyData } from '../util/accessToken';

function getTopArtists(accessToken: string | null) {
	const [topArtists, setTopArtists] = useState<Artist[][]>([]);

	useEffect(() => {
		if (accessToken !== null) {
			const timePeriods = ["short_term", "medium_term", "long_term"];
			
			Promise.all(timePeriods.map(period => 
				fetchSpotifyData(accessToken, `me/top/artists?time_range=${period}&limit=50`)
			)).then(results => {
				const newTopArtists = results.map(result => result.items);
				setTopArtists(newTopArtists);
			});
		}
	}, [accessToken]);

	return topArtists;
}

export default getTopArtists;