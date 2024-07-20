import { useState, useEffect } from 'react';
import { fetchSpotifyData } from '../util/accessToken';

function getTopData(accessToken: string | null): [Artist[][], Track[][]]{
	const [topArtists, setTopArtists] = useState<Artist[][]>([]);
	const [topTracks, setTopTracks] = useState<Track[][]>([]);

	useEffect(() => {
		if (accessToken !== null) {
			const timePeriods = ["short_term", "medium_term", "long_term"];
			
			Promise.all(
				timePeriods.map(period => 
					Promise.all([
						fetchSpotifyData(accessToken, `me/top/artists?time_range=${period}&limit=50`),
						fetchSpotifyData(accessToken, `me/top/tracks?time_range=${period}&limit=50`)
					])
				)
			).then(results => {
				const newTopArtists = results.map(result => result[0].items);
				const newTopSongs = results.map(result => result[1].items);
				setTopArtists(newTopArtists);
				setTopTracks(newTopSongs);
			});
		}
	}, [accessToken]);

	return [topArtists, topTracks];
}

export default getTopData;