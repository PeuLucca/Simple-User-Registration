const BASE_URL = 'http://localhost:5000/api';

export const createUser = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return await response.json();
};

export const searchUsers = async (name) => {
  const response = await fetch(`${BASE_URL}/users/search?name=${name}`);
  return await response.json();
};
