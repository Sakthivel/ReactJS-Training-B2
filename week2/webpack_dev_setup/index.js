// (function(){
//     return {
//         add: function add() {
//         },
//         subtract: function subtract() {
            
//         }
//     }
    
// })();

// require.js
// CommonJS/1.1
// ES6 - import & export
// AMD (asynchronous module definition)

// module.exports = function add(a,b)  {
//     return a+b;
// }

// run via node all content to pass as module only

const addModule = function add(a, b) {
    return a + b;
};

export addModule;
