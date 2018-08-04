// Movie App Script File
class movie {

    constructor(Apikey) {
        this._APIKey = Apikey;
        this.favMoviesList = localStorage.getItem('FavMoviesList') ? JSON.parse(localStorage.getItem('FavMoviesList')) : {
            results: []
        };
        this.loadFavMovies();
    }

    get searchTerm() {
        return this._searchTerm;
    }

    set searchTerm(newTerm) {
        this._searchTerm = newTerm;
    }

    loadFavMovies() {
        if (this.favMoviesList.results.length) {
            this.showMovieResults(this.favMoviesList.results, false);
        }
    }

    callApi() {
        let _this = this,
            xhr = new XMLHttpRequest();

        xhr.open('GET', "https://api.themoviedb.org/3/search/movie?api_key=" + this._APIKey + "&include_adult=false&query=" + this.searchTerm, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);

                if (response && response.results && response.results.length == 0) {
                    console.log('no results');
                } else {
                    _this.showMovieResults(response.results, true);
                }
            } else if (xhr.status == 404) {
               console.log('error');
            }
        };

        xhr.send();
    }

    showMovieResults(lists, addListener) {
        let listsView = document.getElementById("lists"),
            _this = this;
        listsView.innerHTML = "";
        document.getElementsByClassName('result-wrapper')[0].style.visibility = 'visible';

        for (let list in lists) {
            let liEle = document.createElement("li");
            let imgEle = document.createElement("div");
            let detailEle = document.createElement("div");

            let imgDetailEle = document.createElement("img");
            let attrSrc = document.createAttribute("src");
            let altText = document.createAttribute("alt");

            let discriEle = document.createElement("div");
            let titleEle = document.createElement("div");
            let dateEle = document.createElement("span");
            let actionEle = document.createElement("button");
            let name = document.createTextNode(lists[list].title);
            let relDate = document.createTextNode(this.formatDate(lists[list].release_date));
            let descrip;
            let descriptText = lists[list].overview;
            let addToFav = document.createTextNode('addToFav');

            actionEle.className = "btn btn-success";
            titleEle.className = "movie-name";
            imgEle.className = "image";
            detailEle.className = "details";
            attrSrc.value = "https://image.tmdb.org/t/p/w200" + lists[list].poster_path;
            altText.value = "Image Missing";

            if (descriptText.length > 241) {
                descriptText = descriptText.substring(0, 240);
            }
            descrip = document.createTextNode(descriptText);

            titleEle.appendChild(name);
            dateEle.appendChild(relDate);
            titleEle.appendChild(dateEle);
            discriEle.appendChild(descrip);
            actionEle.appendChild(addToFav);
            actionEle.setAttribute("id", "favList_" + lists[list].id);

            imgEle.appendChild(imgDetailEle);
            imgDetailEle.setAttributeNode(attrSrc);
            imgDetailEle.setAttributeNode(altText);

            detailEle.appendChild(titleEle);
            detailEle.appendChild(discriEle);
            if (addListener) {
                detailEle.appendChild(actionEle);
            }

            liEle.appendChild(imgEle);
            liEle.appendChild(detailEle);

            listsView.appendChild(liEle);

            if (addListener) {

                let addToFavBtn = document.getElementById("favList_" + lists[list].id);

                addToFavBtn.addEventListener('click', function (e) {

                    let targetEle = e.target,
                        existingMovie = true;

                    let id = targetEle.getAttribute('id').substring(8, targetEle.getAttribute('id').length);
                    e.target.style.visibility = 'hidden';
                    //var selectedMovieObj = lists[id] ? lists[id] : '';

                    var selectedMovieObj = lists.find(function (obj) {
                        return obj.id == id;
                    });


                    if (_this.favMoviesList.results.length > 0) {
                        _this.favMoviesList.results.map(item => {

                            if (item.id == id) {
                                existingMovie = false;
                            }
                        });

                        if (existingMovie) {

                            _this.favMoviesList.results.push(selectedMovieObj);
                        }
                    } else {
                        _this.favMoviesList.results.push(selectedMovieObj);
                    }

                    _this.addMovieToFavList(JSON.stringify(_this.favMoviesList));

                });

                document.getElementById("search-label").innerHTML = this.searchTerm;
            } else {
                document.getElementById("search-label").innerHTML = "My Favourite Movie List";
            }
        }
    }

    addMovieToFavList(data) {
        localStorage.setItem('FavMoviesList', data);
    }

    formatDate(input) {
        if (input) {
            let datePart = input.match(/\d+/g),
                year = datePart[0] ? datePart[0] : '',
                month = datePart[1] ? datePart[1] : '',
                day = datePart[2] ? datePart[2] : '';

            return day + '/' + month + '/' + year;
        } else {
            return '';
        }
    }

    submitFormAction() {
            let inputValue = document.getElementById("search").value;

            if (inputValue) {
                this.searchTerm = inputValue;
                this.callApi();
            }
    }

}

(function (document){

    const movieObject = new movie('843a0406123e1b0b1048f4f810755a87');

    document.getElementById('movieSearch').addEventListener('submit', function (event) {
        event.preventDefault();
        movieObject.submitFormAction();
    });
    document.getElementsByClassName('favMovies')[0].addEventListener('click', function (event) {
        event.preventDefault();
        movieObject.loadFavMovies();
    });

})(document);
