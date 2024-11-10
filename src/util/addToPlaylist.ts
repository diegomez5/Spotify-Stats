function addToPlaylist(songs: string[], playlist: Playlist, UserId: String, accessToken: string) {
    if (songs.length === 0 || playlist === null || accessToken === null) {
        return;
    }

    if (playlist.id === "create new") {
        fetch(`https://api.spotify.com/v1/users/${UserId}/playlists`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "New Playlist",
            })
        })
        .then(response => response.json())
        .then(data => {
            addToPlaylist(songs, data, UserId, accessToken)
        })
        .catch(error => {
            console.error('Error creating playlist:', error);
        });
    } else {
        fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uris: songs
            })
        })
    }
} 

export { addToPlaylist };