const API_URL = "http://localhost:9000";

const ACCESS_TOKEN_KEY = "access-token";

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function login(email, pwd) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, pwd })
    });
    if (!response.ok) {
        return null;
    }
    const { token } = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return getUserFromToken(token);
}

function getUserFromToken(token) {
    const claims = jwtDecode(token);
    return {
        id: claims.sub,
        email: claims.email,
    };
}