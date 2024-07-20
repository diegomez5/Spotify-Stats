import { useState, useEffect } from 'react';
import { getToken } from '../util/accessToken';

function authenticate() {
	const [code, setCode] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const param_code = params.get("code");

		if (param_code !== null) setCode(param_code);
	}, []);

	useEffect(() => {
		if (code !== null) {
			getToken(code).then((token) => {
				setAccessToken(token);
			});
		}
	}, [code]);

	return { code, accessToken };
}

export default authenticate;