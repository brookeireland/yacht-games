async function fetchGet(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request Failed: ${url} Status = ${response.status}`);
  }
  return await response.json();
}
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

export async function fetchUsername(): Promise<string> {
  const body = await fetchGet("/api/username");
  return body.username;
}

export async function sendUsername(value: string) {
  await fetchPost("/api/username", {
    username: value,
  });
}
