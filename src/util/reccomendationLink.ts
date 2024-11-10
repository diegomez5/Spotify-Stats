function isArtist(item: DataItem): item is Artist {
    return (item as Artist).images !== undefined;
}

function getRecLink(recommendationSeeds: DataItem[]): string {
    const artistSeeds = recommendationSeeds.filter(isArtist).map(seed => seed.id);
    const trackSeeds = recommendationSeeds.filter(seed => !isArtist(seed)).map(seed => seed.id);

    const seedArtists = artistSeeds.length > 0 ? `&seed_artists=${artistSeeds.join('%2C')}` : '';
    const seedTracks = trackSeeds.length > 0 ? `&seed_tracks=${trackSeeds.join('%2C')}` : '';

    return `recommendations?limit=50${seedArtists}${seedTracks}`;
}


export { getRecLink };