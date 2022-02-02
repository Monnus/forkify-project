import perantView from "./perantView.js";
import icons from "../../img/icons.svg";

 class paginationView extends perantView{
 _perentElement=document.querySelector(".pagination");
//  _parentElement = document.querySelector('.pagination');

 addHandlerClick(handler){
   this._perentElement.addEventListener("click",function(e){
     const btn=e.target.closest(".btn--inline");
     if(!btn)return;
     const gotoPage=+btn.dataset.page;
     console.log(btn,gotoPage);
   handler(gotoPage)

   })
 }
 _generateMarkup(){
  console.log(this._data);
  const curPage=this._data.defaultPage;
  const numberOfPages=Math.ceil(this._data.results.length/this._data.resultsPerPage)
  console.log(numberOfPages);
        // page 1,other pages
        if (curPage === 1 && numberOfPages > 1) {
  return `  
      <button data-page="${curPage+1}" class="btn--inline pagination__btn--next">
      <span>Page ${curPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
}
        //last page,can go back
        if (curPage === numberOfPages && numberOfPages > 1) {
  return `
  <button data-page="${curPage-1}" class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>Page ${curPage-1}</span>
</button>`;
}
        //on other page
 if (curPage < numberOfPages) {
  return `
  <button data-goto="${
    curPage - 1
  }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>
  <button data-goto="${
    curPage + 1
  }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
`;
}
        //no other pages
        return "";

    }
}


export default new paginationView();