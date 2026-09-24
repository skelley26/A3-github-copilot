const postForm = document.querySelector('#postForm');
const postList = document.querySelector('#postList');
const emptyState = document.querySelector('#emptyState');
const createPostModal = document.querySelector('#createPostModal');
const storageKey = 'posts-site-posts';

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function renderPosts() {
  const posts = loadPosts();
  postList.replaceChildren();
  emptyState.hidden = posts.length > 0;

  posts.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'post-card';

    const title = document.createElement('h2');
    title.className = 'h4';
    title.textContent = post.title;

    const body = document.createElement('p');
    body.className = 'mb-2';
    body.textContent = post.body;

    const date = document.createElement('small');
    date.className = 'text-secondary';
    date.textContent = new Date(post.createdAt).toLocaleString();

    article.append(title, body, date);
    postList.append(article);
  });
}

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(postForm);
  const posts = loadPosts();

  posts.unshift({
    title: formData.get('title').trim(),
    body: formData.get('body').trim(),
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(storageKey, JSON.stringify(posts));
  postForm.reset();
  bootstrap.Modal.getInstance(createPostModal).hide();
  renderPosts();
});

renderPosts();