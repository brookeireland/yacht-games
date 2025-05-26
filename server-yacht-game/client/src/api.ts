async function fetchPost(url: string, body: any) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Request Failed: ${url} Status = ${response.status}`);
  }
  return await response.json();
}

export async function apiLogin(username: string): Promise<any> {
  const result = await fetchPost("/api/login", {
    username,
  });
  return result;
}

// - api for highest score
export async function apiTopScore(
  score: number,
  username: string
): Promise<number> {
  const result = await fetchPost("/api/top-score", {
    score,
    username,
  });
  return result;
}

// - API for new game
// - API for roll dice
// - API for scoring dice
// - api for game history
