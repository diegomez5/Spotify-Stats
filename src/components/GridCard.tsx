import { useState, useEffect, useRef } from "react";

import Button from "./Button";

type DataItem = Artist | Track;

interface GridCardProps {
	data: Artist[] | Track[];
	displayButton?: boolean;
	onSelectedChange?: (selected: string[]) => void;
}

const isArtist = (data: DataItem): data is Artist => {
    return (data as Artist).images !== undefined;
};

const GridCard = ({ data, displayButton=false, onSelectedChange }: GridCardProps) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
	const audioInstance = useRef<HTMLAudioElement | null>(null);

	const handleCardClick = (item: DataItem, index: number) => {
		if (isArtist(item)) return;

		let selectedCards
		if (selected.includes(item.uri + " " + index)) {
			selectedCards = selected.filter(selectedItem => selectedItem !== item.uri + " " + index);
		} else {
			selectedCards = [...selected, item.uri + " " + index];
		}

		setSelected(selectedCards);

		if (onSelectedChange) {
			onSelectedChange(selectedCards.map(selectedItem => selectedItem.split(' ')[0]));
		}
	}

	const handlePlayClick = (e: React.MouseEvent, item: DataItem) => {
		e.stopPropagation();

		if (isArtist(item)) return;

		if (audioInstance.current) {
            audioInstance.current.pause();
            audioInstance.current.currentTime = 0;
        }
		
		if (currentlyPlaying === item.name) {
            setCurrentlyPlaying(null);
        } else {
            const newAudio = new Audio(item.preview_url!);
            newAudio.play();
            audioInstance.current = newAudio;
            setCurrentlyPlaying(item.name);
        }
	}
	
	useEffect(() => {
        return () => {
			if (audioInstance.current) {
                audioInstance.current.pause();
                audioInstance.current = null;
            }
        };
    }, []);

	return (
		<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
			{data.map((item, index) => (
				<div className="col" key={index}>
					<div className={`card ${selected.includes(item.uri + " " + index) ? "text-bg-info" : ""}`} onClick={() => handleCardClick(item, index)}>
						<div className="ratio ratio-1x1">
							<img
								src={isArtist(item) ? item.images[0].url : item.album.images[0].url}
								className="card-img-top img-fluid "
								alt={item.name}
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div className="card-body">
							<h5 className="card-title">{item.name}</h5>
							<p className="card-text">
								{isArtist(item) ? item.genres.join(", ") : item.artists.map(artist => artist.name).join(", ")}
							</p>
							{!isArtist(item) && displayButton ? (
								<Button onClick={(e) => handlePlayClick(e, item)} left={77} top={85} active={item.preview_url !== null}>
									{currentlyPlaying && currentlyPlaying === item.name ? "❚❚" : "▶"}
								</Button>
							) : null}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default GridCard;


//const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
//	const audioInstance = useRef<HTMLAudioElement | null>(null);