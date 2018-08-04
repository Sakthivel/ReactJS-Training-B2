import React from 'react';

const AddListHtml = ({id, keyup, change}) =>
  <div className="col add-list col-md-2 col-sm-12 form">
   <div className='form-group'>

    <input type="button"
      className="btn btn-primary"
      id={"addList" + id}
      placeholder="Add to List"
      list="collections"
      onKeyUp={keyup}
      onChange={change}
      value= "add to fav"
    />

   </div>
  </div>
  ;

const CollectionList = ({list}) => {
  if (!list) {
    return <datalist id="collections">
      <option value="Favourites">Favourites</option>
    </datalist>;
  }
  return <datalist id="collections">
    {list.map((item, i) => <option value={item} key={i}> {item} </option>)}
  </datalist>;
};

const CollectionMenu = ({list, menuclick}) => {
  if (!list) {
    return <a className="dropdown-item" href="#Favourites" onClick={menuclick}>Favourites</a>;
  }
  return list.map((item, i) => <a onClick={menuclick} className="dropdown-item" href={"#" + item} key={i}>{item}</a>);
}

module.exports = {
  AddListHtml,
  CollectionList,
  CollectionMenu,
}
