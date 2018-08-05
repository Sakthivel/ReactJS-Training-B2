const MovieReducers = (state = [], action) => {
    switch (action.type) {
        case "init":
        console.log('reducers');
            return {...state, listOfMovies:[...state.listOfMovies, 
                {
                    title: "abcss",
                    releaseDate: "2018-07-02",
                    overview: "Dummy movie and one of best move in 2018, kindly go and watch it in now!",
                    posterPath: "test.png",
                    id: "12345"
                }]
            };
        default: 
            return state;
    }

}

module.exports = MovieReducers;

