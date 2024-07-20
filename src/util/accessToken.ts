const CLIENT_ID = '7593d140df3d4317bfeae4d1d3cc23c8';

async function getToken(code: string): Promise<string> {
	const codeVerifier = localStorage.getItem('verifier');
	if (!codeVerifier) {
		throw new Error('Code verifier not found');
	}

	const payload = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
		client_id: CLIENT_ID,
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: "http://localhost:5173/callback",
		code_verifier: codeVerifier,
		}),
	}

	const body = await fetch("https://accounts.spotify.com/api/token", payload);

	const response = await body.json();

	return response.access_token;
}

async function fetchSpotifyData(token: string, endpoint: string): Promise<any> {
	const result = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
		method: "GET", 
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!result.ok) {
		const errorResponse = await result.json();
		console.error("Error:", errorResponse);
	}

	return await result.json();
}

export { getToken, fetchSpotifyData }
