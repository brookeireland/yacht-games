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

export async function readUsername(): Promise<string> {
  const body = await fetchPost("/api/get-username", {});
  return body.username;
}

export async function writeUsername(value: string) {
  await fetchPost("/api/set-username", {
    username: value,
  });
}
