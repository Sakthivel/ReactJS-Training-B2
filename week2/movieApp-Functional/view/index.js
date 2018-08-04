const { createStore } = require('redux');
const movieApp = require('../model');
const store = createStore(movieApp);

const parentElement = (element, className) => {
    if(element.className.search(className) >= 0) {
        return element;
    } else {
        return parent(element.parentNode, className)
    }
}

module.exports = {
  apiCall: function(url, method, data) {
      return new Promise( (resolve, reject) => {
          const XHR = new XMLHttpRequest();

          try{
                XHR.addEventListener("readystatechange", () => {
                  if (XHR.readyState === XHR.DONE && XHR.status === 200) {
                      resolve(XHR.responseText);
                  }
                });

                XHR.open(method, url);
                XHR.send(JSON.stringify(data));
            } catch(e) { reject(e); };
        });
    },

  compose: (...fns) => {
      return fns.reduceRight( (prevFn, nextFn) =>
      (...args) => {
        return nextFn(prevFn(...args))
      },
      value => value
    )
  },

  getStoredData: key => {
    const storedData = localStorage.getItem(key);
    if(storedData) {
      return JSON.stringify(storedData);
    } else {
      return {};
    }
  },

  createHTMLElement: function(htmlString) {
    const element = document.createElement('div');
    element.innerHTML = htmlString;
    return element.firstElementChild;
  },

  row: (html) => `<div class='row'>${html}</div>`,
  col: (html, col) => `<div class='col ${col}'>${html}</div>`,
  container: html => `<div class='container'>${html}</div>`,
  map: fn => array => {
    return array.map( val => fn({...val}))
  },

  join: value => array => {
    return array.join(value);
  },

  getParent: parentElement
}
