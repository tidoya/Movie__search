import defaultkey from './key';

const movieNameRef = document.querySelector('.input__search');
const searchBtn = document.querySelector('.button__search');
const result = document.querySelector('.result');
const svg = 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg';
// fetch data from api
const getMovie = () => {
  result.innerHTML = '';
  const movieName = movieNameRef.value;
  if (movieName.length <= 0) {
    const insertHtml = '<h3 class="msg">Please enter movie title</h3>';
    result.insertAdjacentHTML('afterbegin', insertHtml);
  } else {
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${defaultkey()}`;
    fetch(url).then((resp) => resp.json())
      .then((data) => {
        if (data.Response === 'True') {
          const insertHtml = `
                                <div class="info">
                                    <img src=${data.Poster} class="poster">
                                    <div>
                                      <h2 class="data__title">${data.Title}</h2>
                                      <div class="rating">
                                        <img src="${svg}" class='svgImg'>
                                        <h4 class="data_imdbRating">${data.imdbRating}</h4>
                                      </div>
                                      <div class="details">
                                        <span>${data.Rated}</span>
                                        <span>${data.Year}</span>
                                        <span>${data.Runtime}</span>
                                      </div>
                                      <div class="genre">
                                        <div class="genreArr">
                                        ${data.Genre.split(',').join('</div><div class="genreArr">')}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h3 class="description">Plot:</h3>
                                <p class="description__text">${data.Plot}</p>
                                <h3 class="description">Cast:</h3>
                                <p class="description__text">${data.Actors}<p>
                              `;
          result.insertAdjacentHTML('afterbegin', insertHtml);
        } else {
          const insertHtml = `<h3 class ="massage">${data.Error}</h3>`;
          result.insertAdjacentHTML('afterbegin', insertHtml);
        }
      })
      .catch(() => {
        const insertHtml = '<h3 class ="massage">Error occured</h3>';
        result.insertAdjacentHTML('afterbegin', insertHtml);
      });
  }
};
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getMovie();
});
window.addEventListener('load', getMovie);
