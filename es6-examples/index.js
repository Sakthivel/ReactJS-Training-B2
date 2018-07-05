// 1. Array forEach
/*
    function getStockSymbols(stocks) {
        let stockSymbols = [];
        stocks.forEach(stock => stockSymbols.push(stock.symbol));
        return stockSymbols;
    }
    var stockSymbols = getStockSymbols([{
            symbol: "infy",
            price: 100.0,
            volume: 10000
        },
        {
            symbol: "WPR",
            price: 120.0,
            volume: 100000
        },
        {
            symbol: "ESTI",
            price: 150.0,
            volume: 100001
        }
    ]);
    console.log(stockSymbols); //OUTPUT:- [ 'infy', 'WPR', 'ESTI' ]
*/


// 2. Array.map
/*
    function getStockSymbols(stocks) {
        return stocks.map(stock => stock.symbol);
    }
    var stockSymbols = getStockSymbols([{
            symbol: "infy",
            price: 100.0,
            volume: 10000
        },
        {
            symbol: "WPR",
            price: 120.0,
            volume: 100000
        },
        {
            symbol: "ESTI",
            price: 150.0,
            volume: 100001
        }
    ]);
    console.log(stockSymbols); //OUTPUT:- [ 'infy', 'WPR', 'ESTI' ]

    Array.prototype.map = function (fn) {
        var results = [];
        this.forEach(item => {
            results.push(fn(item));
        });
        return results;
    };
*/
/*
    function getStockSymbols(stocks) {
        return stocks.map(stock => stock.symbol);
    }
    var stockSymbols = getStockSymbols([{
            symbol: "infy",
            price: 100.0,
            volume: 10000
        },
        {
            symbol: "WPR",
            price: 120.0,
            volume: 100000
        },
        {
            symbol: "ESTI",
            price: 150.0,
            volume: 100001
        }
    ]);
    console.log(stockSymbols); //OUTPUT:- [ 'infy', 'WPR', 'ESTI' ]
*/

// 3. Array filter
/*
    function getStocksOver(stocks, minPrice) {
        var results = [];
        stocks.forEach(stock => {
            if (stock.price > minPrice) {
                results.push(stocks);
            }
        });
        return results;
    }
    var expensiveStocks = getStocksOver(
        [{
                symbol: "infy",
                price: 100.0,
                volume: 10000
            },
            {
                symbol: "WPR",
                price: 120.0,
                volume: 100000
            },
            {
                symbol: "ESTI",
                price: 150.0,
                volume: 100001
            }
        ],
        100.0
    );
    //console.log(expensiveStocks);
*/

/*
    function getStocksOver(stocks, minPrice) {
        return stocks.filter(function (stock) {
            return stock.price > minPrice;
        });
    }
    Array.prototype.filter = function (predicate) {
        var results = [];
        this.forEach(item => {
            if (predicate(item)) {
                results.push(item);
            }
        });
        return results;
    };
    var expensiveStocks = getStocksOver(
        [{
                symbol: "infy",
                price: 100.0,
                volume: 10000
            },
            {
                symbol: "WPR",
                price: 120.0,
                volume: 100000
            },
            {
                symbol: "ESTI",
                price: 150.0,
                volume: 100001
            }
        ],
        100.0
    );
    console.log(expensiveStocks); //OUTPUT:-  [ { symbol: 'WPR', price: 120, volume: 100000 },{ symbol: 'ESTI', price: 150, volume: 100001 } ]
*/

/*
    function getStocksOver(stocks, minPrice) {
        return stocks.filter(function (stock) {
            return stock.price > minPrice;
        });
    }

    var expensiveStocks = getStocksOver(
        [{
                symbol: "infy",
                price: 100.0,
                volume: 10000
            },
            {
                symbol: "WPR",
                price: 120.0,
                volume: 100000
            },
            {
                symbol: "ESTI",
                price: 150.0,
                volume: 100001
            }
        ],
        100.0
    );
    console.log(expensiveStocks); //OUTPUT:-  [ { symbol: 'WPR', price: 120, volume: 100000 },{ symbol: 'ESTI', price: 150, volume: 100001 } ]
*/

// Chaining map & filter
/*
    var stocks = [{
            symbol: "infy",
            price: 100.0,
            volume: 10000
        },
        {
            symbol: "WPR",
            price: 120.0,
            volume: 100000
        },
        {
            symbol: "ESTI",
            price: 150.0,
            volume: 100001
        }
    ];
    var filteredStocks = stocks
        .filter(stock => {
            return stock.price > 100.0;
        })
        .map(stock => stock.symbol);

    console.log(filteredStocks); // OUTPUT:- [ 'WPR', 'ESTI' ]

*/

// reduce
/*let result = arr.reduce(callback);
    Optionally, you can specify an initial value
let result = arr.reduce(callback, initValue);*/
/*
    let arr = [1, 2, 3, 10];
    let sum = arr.reduce((acc, val) => {
        return acc + val;
    }, 50);
    console.log(sum); // OUTPUT:- 66 */

// Destructuring

/*
    function foo() {
        return [1, 2, 3];
    }

    var tmp = foo(),
        a = tmp[0],
        b = tmp[1],
        c = tmp[2];

    console.log(a, b, c); //OUTPUT:- 1 2 3

*/
/*
    function bar() {
        return {
            x: 4,
            y: 5,
            z: 6
        };
    }

    var tmp = bar(),
        x = tmp.x,
        y = tmp.y,
        z = tmp.z;

    console.log(x, y, z); //OUTPUT:- 4 5 6

*/

//Array destructuring

/* 
    function foo() {
        return [1, 2, 3];
    }
    var [a, b, c] = foo();
    console.log(a, b, c); //OUTPUT:- 1 2 3

*/

//Object destructuring

/*
    function bar() {
        return {
            x: 4,
            y: 5,
            z: 6
        };
    }
    var {
        x: x,
        y: y,
        z: z
    } = bar();
    console.log(x, y, z); //OUTPUT:- 4 5 6
*/

// Spread/Rest
/*
    function foo(x, y, z) {
        console.log(x, y, z);
    }

    foo(...[1, 2, 3]); //OUTPUT:- 1 2 3
*/
/*
    var a = [2, 3, 4];
    var b = [1, ...a, 5];

    console.log(b); // OUTPUT:- [ 1, 2, 3, 4, 5 ]
*/

/*
    function foo(x, y, ...z) {
        console.log(x, y, z);
    }

    foo(1, 2, 3, 4, 5); // OUTPUT:- 1 2 [ 3, 4, 5 ]
*/
/*
    function foo(...args) {
        console.log(args);
    }

    foo(1, 2, 3, 4, 5); // OUTPUT:- [ 1, 2, 3, 4, 5 ]
*/

// mutability and immutability

// Mutability
/*
    var immutableString = "Hello";

    // In the above code, a new object with string value is created.

    immutableString = immutableString + "World";

    console.log(immutableString); // OUTPUT:- HelloWorld
*/
/*
    const car = {
        company: "volvo",
        model: "s60"
    };
    const newCar = car;
    newCar.model = "s90";
    console.log(newCar === car); // true
    console.log(car); // { company: 'volvo', model: 's90' }
*/

// Going immutable
    const car = {
        company: "volvo",
        model: "s60"
    };
    const newCar = Object.assign({}, car, {
        model: "s90"
    });
    console.log(newCar === car);
    console.log(car);
    console.log(newCar);
