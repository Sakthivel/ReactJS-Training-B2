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
        let titleEle = document.createElement("div");
        let actionEle = document.createElement("button");
        let name = document.createTextNode(lists[list].title);
        let addToFav = document.createTextNode('addToFav');
        actionEle.className = "btn btn-success";
        titleEle.className = "movie-name";
        titleEle.appendChild(name);
        actionEle.appendChild(addToFav);
        liEle.appendChild(titleEle);
        liEle.appendChild(actionEle);
        listsView.appendChild(liEle);
    }
    
    
}