// search list selecotr
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

//fetch----------------------------

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2Y3ZTJlNmYxZGM1ZDFmZjYzYWM3MWZlZWZkOGYyNCIsInN1YiI6IjY0NzVhNGRiYzI4MjNhMDBhOGQ0Y2IwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3agK52fcQpw-ATx49Uc2L9u9k0GEJpV8-QzCUzqgiGU',
  },
};

movie_card.remove();

function ready() {
  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data['results'];

      movies.forEach((movie) => {
        let title = movie['title'];
        let overview = movie['overview'];
        let poster_path = movie['poster_path'];
        let vote_average = movie['vote_average'];
        let id = movie['id'];

        // movie_cards
        let temp_html = `<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="poster_path"></img>
              <h2 class="title">${title}</h2>
              <span class="overview">${overview}</span>
              <span class="vote_average">평점: ${vote_average}</span>
              </li>
          `;
        movie_lists.insertAdjacentHTML('beforeend', temp_html);

        // 클릭시 id alert
      });
      return movie;
    })
    .then((movie) => {
      document.querySelector('li').addEventListener('click', () => {
        alert('hi');
      });
    })
    .catch((err) => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => {
  ready();
});
