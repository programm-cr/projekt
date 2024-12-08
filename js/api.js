const API_BASE_URL = "https://dummyjson.com/users";

export async function fetchPosts(page = 1, limit = 10) {
  const response = await fetch(`${API_BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`);
  const data = await response.json();

  return data.users.map(user => ({
    id: user.id,
    title: `${user.firstName} ${user.lastName}`, 
    body: `Post body lorem ipsum dolor sit amet consectetur.`,
    userId: user.id,
  }));
}

export async function fetchUser(userId) {
  const response = await fetch(`${API_BASE_URL}/${userId}`);
  return response.json();
}

export async function fetchUserPosts(userId, page = 1, limit = 10) {
  const user = await fetchUser(userId);
  const posts = [];
  for (let i = 1; i <= limit; i++) {
    posts.push({
      id: i + (page - 1) * limit,
      title: `${user.firstName} ${user.lastName}`, 
      body: `Post body lorem ipsum dolor sit amet consectetur.`,
      userId: user.id,
    });
  }
  return posts;
}
