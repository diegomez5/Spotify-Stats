const CLIENT_ID = '7593d140df3d4317bfeae4d1d3cc23c8';
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string

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
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  const resp = await fetch('https://accounts.spotify.com/api/token', payload);
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error('Token exchange failed: ' + err);
  }
  const json = await resp.json();
  const token = json.access_token as string;
  localStorage.setItem('token', token);
  return token;
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
