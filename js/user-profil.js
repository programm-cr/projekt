import { fetchUser, fetchUserPosts } from './api.js';

const userDetails = document.getElementById('user-info');
const postsList = document.getElementById('user-posts-list');
const loadingSpinner = document.getElementById('loading-spinner');

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

let page = 1;
let isLoading = false;

async function loadUser() {
  try {
    const user = await fetchUser(userId);
    userDetails.innerHTML = `
      <img src="${user.image}" alt="Avatar of ${user.firstName}">
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>Email: ${user.email}</p>
    `;
  } catch (error) {
    console.error('Error loading user:', error);
  }
}

async function loadUserPosts() {
  if (isLoading) return;
  isLoading = true;
  loadingSpinner.classList.remove('hidden');

  try {
    const posts = await fetchUserPosts(userId, page);
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postsList.appendChild(postElement);
    });

    page++;
  } catch (error) {
    console.error('Error loading user posts:', error);
  } finally {
    isLoading = false;
    loadingSpinner.classList.add('hidden');
  }
}

loadUser();
loadUserPosts();
