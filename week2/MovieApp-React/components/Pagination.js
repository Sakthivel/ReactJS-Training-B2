import React from 'react';
const Pagination = ({ totalPages, min, max, onclick }) => {
  // console.log(totalPages, min, max);
  const minPage = parseInt(min, 10) || 1;
  const maxPage = parseInt(max, 10);
  const temp = (minPage && maxPage)
    ? new Array(maxPage - minPage).fill(0, 0, maxPage - minPage)
    : new Array(totalPages).fill(0, 0, totalPages);

  return <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      {temp.map( (m, i) => {
        return (
        <li className={"page-item item item-"+ (i+minPage) } onClick={onclick} key={i} >
          <a className="page-link" href={ "#"+ (i + minPage) }>{i + minPage}</a>
        </li>
        );
      })}
    </ul>
  </nav>;
};

/*

<Pagination
  totalPages={this.state.totalPages}
  max={this.state.max}
  min={this.state.min}
  onclick={this.handlePaginationClick.bind(this)}
/>

*/

export default Pagination;
