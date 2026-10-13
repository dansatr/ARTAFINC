// Placeholder. Replace the body with a real request to your backend.
export async function requestSignIn(username, password) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (password.length < 4) {
    return { isSuccessful: false };
  }

  return { isSuccessful: true, user: { username } };
}
