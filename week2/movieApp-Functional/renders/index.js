import {compose, createHTMLElement, row, col, map, join, container} from '../view';
import {imgBasePath} from '../services/config';

const generateListInCard = (list) => {
  if (!list) {
    return 'Add to a List';
  }
  return list.reduce((acc, item) => `
    ${acc}<span class='list-item badge badge-pill badge-info'>${item} <a href='#' class='delete close'>remove</a></span>
  `, '');
};

const cardHTML = ({
  title, releaseDate, overview, id, posterPath, inList,
}) => `
<div class="movie-details" data-movietitle=${encodeURI(title)} data-year=${releaseDate} data-desc=${encodeURI(overview)} data-id=${id} data-poster=${posterPath}>
<h3 class="mov-title">${title}</h3>
<p class="year">${releaseDate}</p>
<p class="desc">${overview}</p></div>`;


const imgHTML = ({posterPath, title})  => `<div class="image"><img src="${imgBasePath}${posterPath}" alt="${title}"></div>`;




const getCollectionsListHtml = (list) => {
  return '';
};

const getCollectionMenu = (list) => {
  if (!list) {
    return '<a class="dropdown-item" href="#Favourites">Favourites</a>';
  }
  return list.reduce((accu, item) => `${accu}<a class="dropdown-item" href="#${item}">${item}</a>`, '');
};

const addListHtml = id => `<div class="add-fav"><button class="btn btn-primary" id="favList_${id}">Add to List</button></div>`;

const movieCardHtml = ({
  title, release_date: releaseDate,
  overview, poster_path: posterPath,
  id, list: inList,
}) => `
${imgHTML({ posterPath, title })}
${cardHTML({
    title, releaseDate, overview, id, posterPath, inList,
  })}
${addListHtml(id)}
`;

const movieCard = compose(row, movieCardHtml);

const moviesList = compose(createHTMLElement, container, join(''), map(movieCard));

const _pagination = ({ totalPages, min, max }) => {
  const minPage = parseInt(min, 10) || 1;
  const maxPage = parseInt(max, 10);
  const temp = (minPage && maxPage)
    ? new Array(maxPage - minPage).fill(0, 0, maxPage - minPage)
    : new Array(totalPages).fill(0, 0, totalPages);
  return `${temp.reduce((acc, cv, ci) => `${acc}<li class='page-item item item-${ci + minPage}'>
  <a class='page-link' href='#${ci + minPage}'>${ci + minPage}</a></li>`,
  `<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">`)}</ul></nav>`;
};

const pagination = compose(createHTMLElement, container, row, col, _pagination);

export {
  moviesList,
  pagination,
  getCollectionsListHtml,
  getCollectionMenu,
  generateListInCard,
};
