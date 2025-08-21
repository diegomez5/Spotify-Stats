import { useState, useEffect, useRef } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";
import GridCard from "./components/GridCard";
import Navbar from "./components/Navbar";
import Scrollspy from "./components/Scrollspy";
import Slider from "./components/Slider";
import ListGroup from "./components/ListGroup";
import DropDown from "./components/DropDown";

import authenticate from "./hooks/authenticate";
import getTopData from "./hooks/getUserData";

import { redirectToAuth } from "./util/authLink";
import { fetchSpotifyData } from "./util/accessToken";
import { getRecLink } from "./util/reccomendationLink";
import { addToPlaylist } from "./util/addToPlaylist";

function App() {
	const gridCardRef = useRef<GridCardRef>(null);
	
	// need for a re-render
	const [selectedCount, setSelectedCount] = useState(0);

	const handleSelectCards = () => {
		if (gridCardRef.current) {
			if (gridCardRef.current?.selected.length === displayedReccomendations.length) {
				gridCardRef.current.setSelected([]);
				setSelectedCount(0);
			} else {
				gridCardRef.current.selectAllCards();
				setSelectedCount(displayedReccomendations.length);
			}
		}
	};


	const { code, accessToken } = authenticate();
	const [topArtists, topTracks, playlists, UserId] = getTopData(accessToken);

	const [timePeriod, setTimePeriod] = useState<number>(1);
	const [displayingArtists, setDisplayingArtists] = useState<boolean>(true);
	const [reccomendations, setReccomendations] = useState<Track[]>([]); // reccomendations from seeds
	const [displayedReccomendations, setDisplayedReccomendations] = useState<Track[]>([]); // reccomendations to display
	const [reccomendationSeeds, setReccomendationSeeds] = useState<DataItem[]>([]);

	const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();

	useEffect(() => {
		if (accessToken !== null) {
			if (reccomendationSeeds.length > 0) {
				fetchSpotifyData(accessToken, getRecLink(reccomendationSeeds)).then(result => {
					setReccomendations(result.tracks);
				});
			} else {
				// add to show a message to select seeds
			}
		}
	}, [accessToken, reccomendationSeeds]);
	

	if (!code || !accessToken) {
		return (
		<div style={{ backgroundColor: '#3b3b3b', height: '100vh' }}>
			<Button onClick={redirectToAuth}>
				Login
			</Button>
		</div>
		);
	}

	if (topArtists.length < 3) {
		return (
		<div style={{ backgroundColor: '#3b3b3b', height: '100vh' }}>
			<Alert>Loading profile...</Alert>
		</div>
		);
	}

	return (
		<div style={{ backgroundColor: '#3b3b3b', height: '100vh' }}>
			<Navbar headings={["Top Artists", "Reccomendations"]}> 
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: "50%" }}>
						<Scrollspy height={93}>
							<GridCard data={displayingArtists ? topArtists[timePeriod] : topTracks[timePeriod]} />
						</Scrollspy>
					</div>
					<div style={{width: '50%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
						<Button onClick={() => setDisplayingArtists(!displayingArtists)} >
							{displayingArtists ? "See Top Tracks" : "See Top Artists"}
						</Button>
						<Slider doAfterChange={(c) => setTimePeriod(c)} min={0} max={2} width={100} />
					</div>
				</div>



				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: "50%" }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
							<div style={{ flexBasis: '75%', flexGrow: 1 }}>
								<Button 
									onClick={() => gridCardRef.current && gridCardRef.current.currentlyPlaying ? 
										gridCardRef.current.handlePlayClick(gridCardRef.current.currentlyPlaying) : 
										() => {}} 
									width={100}>
									Pause Audio
								</Button>
							</div>
							<div style={{ flexBasis: '25%', flexGrow: 1 }}>
								<Slider 
									doAfterChange={(e) => gridCardRef.current ? gridCardRef.current.setVolume(e/100) : () => {}} 
									min={0} 
									max={100}
									width={100}
									label="Volume: "
								/>
							</div>
						</div>
						<Scrollspy height={85}>
							<GridCard ref={gridCardRef} data={displayedReccomendations} displayButton={true} onSelectedChange={(s) => setSelectedCount(s.length)}/>
						</Scrollspy>
					</div>


					<div style={{width: '50%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
						<Button width={100} onClick={() => setDisplayedReccomendations(reccomendations)}>
							See Reccomendations
						</Button>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
							<div style={{ flexBasis: '50%', flexGrow: 1 }}>
								<DropDown items={topArtists[0]} onClick={(artist) => setReccomendationSeeds([...reccomendationSeeds, artist as Artist])}>
									Select Artist
								</DropDown>
							</div>
							<div style={{ flexBasis: '50%', flexGrow: 1 }}>
								<DropDown items={topTracks[0]} onClick={(track) => setReccomendationSeeds([...reccomendationSeeds, track as Track])}>
									Select Song
								</DropDown>
							</div>
						</div>
						<h1 style={{ alignSelf: 'center' }}>Selected Seeds:</h1>
						<ListGroup items={reccomendationSeeds} updateItems={setReccomendationSeeds}/>

						<div style={{ height: '60px' }}></div> {/* Spacer div */}

						<h2 style={{ alignSelf: 'center' }}>Create playlist with reccomendations:</h2>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
							<div style={{ flexBasis: '50%', flexGrow: 1 }}>
								<DropDown items={playlists} onClick= {(playlist) => setSelectedPlaylist(playlist as Playlist)}> 
									Add to current playlist
								</DropDown>
							</div>
							<div style={{ flexBasis: '50%', flexGrow: 1 }}>
								<Button onClick={() => setSelectedPlaylist({name: "New Playlist", id: "create new"})} width={100}>
									Add songs to new playlist
								</Button>
							</div>
						</div>
						<h2 style={{ alignSelf: 'center' }}>Selected Playlist: {selectedPlaylist?.name}</h2>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
							<div style={{ flexBasis: '25%', flexGrow: 1 }}>
								<Button onClick={handleSelectCards} width={100}>
									{(selectedCount === displayedReccomendations.length && selectedCount > 0) ? "Deselect All" : "Select All"}
								</Button>
							</div>
							<div style={{ flexBasis: '75%', flexGrow: 1 }}>
								<Button 
									onClick={() => addToPlaylist(
										gridCardRef.current?.selected.map(item => item.split(' ')[0]) as string[], 
										selectedPlaylist as Playlist, 
										UserId, 
										accessToken
									)}
									width={100}>
									Add selected songs to playlist
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Navbar>
		</div>
	);
}


export default App;

// remove dupes from seed artists
// add a gray out if too many seeds




