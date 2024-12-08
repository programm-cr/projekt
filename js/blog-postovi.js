import { fetchPosts } from './api.js';

const postsList = document.getElementById('posts-list');
const loadingSpinner = document.getElementById('loading-spinner');

let page = 1;
let isLoading = false;


function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


async function loadPosts() {
  if (isLoading) return;
  isLoading = true;
  loadingSpinner.classList.remove('hidden'); 

  try {
    const posts = await fetchPosts(page); 
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post', 'lazy-content'); 
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button data-user-id="${post.userId}">View User</button>
      `;
      postsList.appendChild(postElement); 
    });

    const buttons = postsList.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const userId = event.target.getAttribute('data-user-id');
        viewUser(userId); 
      });
    });

    page++; 
  } catch (error) {
    console.error('Error loading posts:', error);
  } finally {
    isLoading = false;
    loadingSpinner.classList.add; 
  }
}


function viewUser(userId) {
  window.location.href = `user-profil.html?userId=${userId}`;
}


function lazyLoadContent() {
  const lazyContentElements = document.querySelectorAll(".lazy-content"); 
  lazyContentElements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("loaded"); 
    }
  });
}


window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPosts();
  }
});


loadPosts();

lazyLoadContent();

window.addEventListener("scroll", lazyLoadContent);
