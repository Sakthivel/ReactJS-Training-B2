const gallery = require('../gallery');

module.exports = state => {
  if(!state.searchResults) return null;

  //let finalString;
  
  //for (const key in state.searchResults) {
    const title = state.searchResults.results[0].title;
    const description = state.searchResults.results[0].overview;
    const imageUrl = 'https://image.tmdb.org/t/p/w200' + state.searchResults.results[0].poster_path;
    

    return gallery({
      title,
      description,
      imageUrl
    });
  //}

  //console.log("finalString", finalString);
  
 // return finalString;
};
