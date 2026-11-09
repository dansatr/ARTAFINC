// Fake backend for now. Swap these out for real API calls later.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestSignIn(username, password) {
  await wait(900);

  if (password.length < 4) {
    return { isSuccessful: false };
  }
  return { isSuccessful: true, user: { username, fullName: username } };
}

export async function requestSignUp({ fullName, username }) {
  await wait(900);
  return { isSuccessful: true, user: { username, fullName } };
}
