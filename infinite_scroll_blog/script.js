const postContainer = document.getElementById('posts-container');
const searchEl = document.getElementById('filter');
const loaderEl = document.querySelector('.loader');

let posts = [];
let lastPostIndex = 0;
NUMBER_POSTS = 5;

/** getPosts when rich bottom page */
window.addEventListener('scroll', (e) => {
  // handle the scroll event
  Math.round(document.body.offsetHeight) ===
  Math.round(window.innerHeight + window.pageYOffset)
    ? getPosts()
    : '';

  /** Manera pro */
  // const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // if (scrollHeight - scrollTop === clientHeight) {
  //   showLoading();
  // }
});

searchEl.addEventListener('keypress', searchPost);

/**
 *
 * Filter posts Array with search field string
 */
function searchPost() {
  if (posts.length === 0) return;

  const postSearch = posts.filter((post) => {
    return post.title.includes(searchEl.value) ? post : '';
  });
  postContainer.innerHTML = '';
  printPosts(postSearch);
  lastPostIndex = lastPostIndex + NUMBER_POSTS;
}

const getDataAPI = async function () {
  try {
    const repUrl = `https://jsonplaceholder.typicode.com/posts`;
    return await new Promise((resolve, reject) => {
      fetch(repUrl)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });

    /** otra formaa */
    // const res = await fetch(
    //   `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    // );

    // const data = await res.json();

    // return data;
  } catch (error) {
    console.log(error);
  }
};

function printPosts(postsToShow) {
  // Hide loader Spin
  loaderEl.classList.remove('show');

  postsToShow.map((post) => {
    const { id, title, body } = post;
    const markUpPost = `
    <div class="post">
        <div class="number">${id}</div>
        <div class="post-info">
            <h2 class="post-title">${title}</h2>
            <p class="post-body">${body}</p>
        </div>
    </div>
    `;

    postContainer.insertAdjacentHTML('beforeend', markUpPost);
  });
}

function getPosts() {
  //- Fetch initial posts from API and display
  postsFech = getDataAPI();

  // Show loader Spin
  loaderEl.classList.add('show');

  postsFech.then((post) => {
    //set global variable all posts
    posts = post;
    setTimeout(function () {
      const postsToShow = posts.slice(
        lastPostIndex,
        NUMBER_POSTS + lastPostIndex
      );
      printPosts(postsToShow);
      lastPostIndex = lastPostIndex + NUMBER_POSTS;
    }, 10);
  });
}

function init() {
  getPosts();
}

init();
