import { useState, useEffect } from 'react';
import { fetchSpotifyData } from '../util/accessToken';

function getTopData(accessToken: string | null): [Artist[][], Track[][], Playlist[], UserId: string] {
	const [topArtists, setTopArtists] = useState<Artist[][]>([]);
	const [topTracks, setTopTracks] = useState<Track[][]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [UserId, setUserId] = useState<string>("");

	useEffect(() => {
		if (accessToken !== null) {
			const timePeriods = ["short_term", "medium_term", "long_term"];
			
			Promise.all([
				Promise.all(
					timePeriods.map(period =>
						Promise.all([
							fetchSpotifyData(accessToken, `me/top/artists?time_range=${period}&limit=50`),
							fetchSpotifyData(accessToken, `me/top/tracks?time_range=${period}&limit=50`),
						])
					)
				),
				fetchSpotifyData(accessToken, "me/playlists?limit=50"),
				fetchSpotifyData(accessToken, "me")
			])
			.then(([topResults, playlistsResult, userData]) => {
				const newTopArtists = topResults.map(result => result[0].items);
				const newTopTracks = topResults.map(result => result[1].items);
				setTopArtists(newTopArtists);
				setTopTracks(newTopTracks);

				// only get user's playlists
				setUserId(userData.id);
				playlistsResult.items = playlistsResult.items.filter((playlist: Playlist) => playlist.owner.id === userData.id);
				setPlaylists(playlistsResult.items);
			});
		}
	}, [accessToken]);

	return [topArtists, topTracks, playlists, UserId];
}

export default getTopData;