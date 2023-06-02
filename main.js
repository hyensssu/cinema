// Selector
// search_list selecotr
const search_form = document.querySelector('.search_form');
const searchMovie = document.querySelector('.searchMovie');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
// movie_list selector
const movie_lists = document.querySelector('.movie_lists');
const movie_card = document.querySelector('.movie_card');
const titleSpace = document.querySelector('.title');
const overviewSpace = document.querySelector('.overview');
const poster_pathSpace = document.querySelector('.poster_path');
const vote_averageSpace = document.querySelector('.vote_average');
const scroll = document.querySelector('.scroll');

// scroll up
scroll.addEventListener('click', () => {
  document
    .querySelector('.search_container')
    .scrollIntoView({ behavior: 'smooth' });
});

// -----
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2Y3ZTJlNmYxZGM1ZDFmZjYzYWM3MWZlZWZkOGYyNCIsInN1YiI6IjY0NzVhNGRiYzI4MjNhMDBhOGQ0Y2IwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3agK52fcQpw-ATx49Uc2L9u9k0GEJpV8-QzCUzqgiGU',
  },
};

// fetch 변수에 할당하기
const movies = () => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data['results']);
      })
      .catch((err) => console.error(err));
  });
};

// 맨 처음 로드된 화면
let temp_html = '';
movies().then((movies) => {
  movies.forEach((movie) => {
    let title = movie['title'];
    let overview = movie['overview'];
    let poster_path = movie['poster_path'];
    let vote_average = movie['vote_average'];
    let id = movie['id'];

    temp_html = `<li class="movie_card" id=${id}>
        <img id=${id} src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title} image" class="poster_path"></img>
              <h2 class="title" id=${id}>${title}</h2>
              <span class="overview" id=${id}>${overview}</span>
              <span class="vote_average" id=${id}>평점: ${vote_average}</span>
              </li>
          `;
    movie_lists.insertAdjacentHTML('beforeend', temp_html);
  });
});

// alert()창 띄우기
movies() //
  .then(() => {
    movie_lists.addEventListener('click', (e) => {
      console.dir(e);
      alert(`영화 id :` + e['target']['id']);
    });
  });

// 검색 filter
movies() //
  .then((movies) => {
    btn.addEventListener('click', () => {
      let keyword = input.value;
      // 다시 정리해보기
      if (movies['title'].includes(keyword)) {
        movie_lists.innerHTML = '';
        renderMovies();
      }
    });
  });

// render movies
