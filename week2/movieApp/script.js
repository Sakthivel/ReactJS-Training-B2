// Movie App Script File 
class movieApp {
    
    constructor(searchTerm) {
        this._sreachTream = searchTerm;
    }

    get searchTerm() {
        return this._sreachTream;
    }

    set searchTerm(newTerm) {
        this._sreachTream = newTerm;
    }

    searchMovieList(data) {
        console.log(" data data: -- ", data);
    }

    callApi() {
        console.log("_sreachTream :: " + this._sreachTream);
        console.log("searchTerm :: " + this.searchTerm);

        // let data = "{}";

        // const xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === this.DONE) {
        //         console.log(this.responseText);
        //     }
        // });

        // xhr.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=843a0406123e1b0b1048f4f810755a87&query=tamil");
        // xhr.withCredentials = true;
        // xhr.setRequestHeader('Content-Type', 'application/xml');
        // xhr.send(data);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=843a0406123e1b0b1048f4f810755a87&query=" + this.searchTerm,
            "method": "GET",
            "headers": {},
            "data": "{}"
        }

        const res={};

        $.ajax(settings).done(function (response) {
            //console.log(response);
            showRes(response.results);
        });


        

    }

}

// (function (document){

//     function hello(){
//         console.log("say hello");
//     }

//     hello();

// })(document);

const movie = new movieApp("hello movie");

function submitFormAction(event) {

    let inputValue = document.getElementById("search").value;

    if (inputValue) {
        movie.searchTerm = inputValue;
        event.preventDefault();
        movie.callApi();
        document.getElementById("search-label").innerHTML = inputValue;
        document.getElementsByClassName('result-wrapper')[0].style.visibility = 'visible';
    }
}

function showRes(lists) {
    let listsView = document.getElementById("lists");
    listsView.innerHTML = "";

    for (let list in lists){
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
        let relDate = document.createTextNode(formatDate(lists[list].release_date));
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
            descriptText = descriptText.substring(0,240);
        }
        descrip = document.createTextNode(descriptText);

        titleEle.appendChild(name);
        dateEle.appendChild(relDate);
        titleEle.appendChild(dateEle);
        discriEle.appendChild(descrip);
        actionEle.appendChild(addToFav);

        imgEle.appendChild(imgDetailEle);
        imgDetailEle.setAttributeNode(attrSrc);
        imgDetailEle.setAttributeNode(altText);

        detailEle.appendChild(titleEle);
        detailEle.appendChild(discriEle);
        detailEle.appendChild(actionEle);

        liEle.appendChild(imgEle);
        liEle.appendChild(detailEle);

        listsView.appendChild(liEle);
    }

    function formatDate(input) {
        let datePart = input.match(/\d+/g),
            year = datePart[0],
            month = datePart[1],
            day = datePart[2];

        return day + '/' + month + '/' + year;
    }
    
    
}