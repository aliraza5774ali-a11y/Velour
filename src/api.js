const API_URL = 'http://localhost:3006';

// Small helper so both functions handle errors the same way
async function postJSON(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    // Backend errors (wrong password, email taken, etc.) get thrown
    // so the component's try/catch can show a message.
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const registerUser = async (username, email, password) => {
  // Bug fix: original sent { name, email, password } but the Navbar
  // form field is "username", so we send username to match.
  return postJSON('/api/auth/register', { username, email, password });
};

export const loginUser = async (username, password) => {
  // Bug fix: original function signature was (name, password) but
  // referenced an undefined "email" variable in the body. The login
  // form only collects username + password, so we send those.
  return postJSON('/api/auth/login', { username, password });
};