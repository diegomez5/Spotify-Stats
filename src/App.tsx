import { useState, useEffect } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";
import GridCard from "./components/GridCard";
import Navbar from "./components/Navbar";
import Scrollspy from "./components/Scrollspy";
import Slider from "./components/Slider";

import authenticate from "./hooks/authenticate";
import getTopData from "./hooks/getTopData";

import { redirectToAuth } from "./util/authLink";
import { fetchSpotifyData } from "./util/accessToken";

function App() {
	const { code, accessToken } = authenticate();
	const [topArtists, topTracks] = getTopData(accessToken);
	const [timePeriod, setTimePeriod] = useState<number>(1);
	const [displayingArtists, setDisplayingArtists] = useState<boolean>(true);
	const [reccomendations, setReccomendations] = useState<Track[]>([]);

	const changeTimePeriod = (choice: number) => { setTimePeriod(choice); }

	useEffect(() => {
		if (accessToken !== null) {
			fetchSpotifyData(accessToken, "recommendations?limit=50&seed_artists=7GlBOeep6PqTfFi59PTUUN&seed_genres=pov%3A+indie%2C+indie+pop").then(result => {
				setReccomendations(result.tracks);
			});
		}
	}, [accessToken /* here goes like to api */]);
	

	if (!code || !accessToken) {
		return (
		<div>
			<Button onClick={redirectToAuth}>
				Login
			</Button>
		</div>
		);
	}

	if (topArtists.length < 3) {
		return (
		<div>
			<Alert>Loading profile...</Alert>
		</div>
		);
	}

	return (
		<Navbar headings={["Top Artists", "Reccomendations"]}> 
			<>
				<Scrollspy>
					<GridCard data={displayingArtists ? topArtists[timePeriod] : topTracks[timePeriod]} />
				</Scrollspy>
				<Button onClick={() => setDisplayingArtists(!displayingArtists)} left={57} top={15}>
					{displayingArtists ? "Top Tracks" : "Top Artists"}
				</Button>
				<Slider doAfterChange={changeTimePeriod} />
			</>
			<>
				<Scrollspy>
					<GridCard data={reccomendations} displayButton={true} onSelectedChange={(s) => console.log(s)}/>
				</Scrollspy>
				<Button onClick={() => true === true}>
					Reccomendations
				</Button>
			</>
		</Navbar>
	);
}

export default App;
// https://chatgpt.com/share/74073d03-5284-4835-8907-a08ccd8644bf
/// toodo add selected to playlist, add sliders for other parameters in recoomentdation
// add a selection for artists to get reccomendations from
