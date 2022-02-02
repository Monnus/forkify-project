// import loadRecipe from "./model.js";
import * as model from "./model.js"
import renderViews from "./views/renderViews.js";
import loadSearchView from "./views/loadSearchView.js";
import {MODAL_CLOSE_SEC} from "./config";
import renderResults from "./views/renderResults.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/BookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";
//import "core.js/stable";
import "regenerator-runtime/runtime";
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2
// if(module.hot){
//   module.hot.accept()
// }
const requestApi=async function(){
  try {

    const id=window.location.hash.slice(1);
    if(!id)return;
     renderViews.renderSpinner();

    renderResults.update(model.getPageData());
    bookmarkView.update(model.state.bookmarks)
    await model.loadRecipe(id);
    //rendering recipe
    renderViews.render(model.state.recipe);
    
    console.log(model.state);
    
  } catch (err) {
    renderViews.renderError(    )
    console.error(err.status+" "+err.message);
  }
}


const controlSearchResults= async function(){
  // loadSearchView.addrendersearch(
    try{
      renderResults.renderSpinner();
      //get search query
      const query=loadSearchView.getQuery();
      if(!query)return;
      
      //load search results
      await model.loadSearch(query);
     
      renderResults.render(model.getPageData())
      //render results

      //render paginationView
     paginationView.render(model.state.search);
     
    }catch(err){
      console.log(err);
    }

}
const renderServings=function (newServings){
  model.addRenderServings(newServings)
  renderViews.update(model.state.recipe);

}

const renderPaginationPerPage=function(perPage){
  console.log(perPage);
//   //btn render results
//   console.log(model.state.search.results);
  renderResults.render(model.getPageData(perPage))

  //btn render paginationView
 paginationView.render(model.state.search);
 
}
const addControllBookmark=function(handler){
      //add or remove bookmark
      if(!model.state.recipe.bookmarked)model.addBookmark(model.state.recipe);
      else model.deleteBoobmark(model.state.recipe.id); 

      //update recipeview
      renderViews.update(model.state.recipe);
      //render bookmarks
      bookmarkView.render(model.state.bookmarks);
    }

    const controlBookmarks=function(){
      bookmarkView.render(model.state.bookmarks);
} 
const controlAddRecipe=async function(newRecipe){
  try{

    //show loading spinner
    // addRecipeView.renderSpinner();
      //uplaod the new recipe data
        await model.uplaodRecipe(newRecipe);
        console.log(model.state.recipe);

        //render recipe
        renderViews.render(model.state.recipe);

      //seccess message
        addRecipeView.renderMessage();


        //render the bookmark view
        bookmarkView.render(model.state.bookmarks)

        //change ID in URl

        window.history.pushState(null,"",`#${model.state.recipe.id}`)
      //close form window
        setTimeout(function(){
          addRecipeView.toggleWindow();
        },MODAL_CLOSE_SEC * 1000);  

  }catch(err){
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }

}

const init =function(){
  //function  to uplaod data

  bookmarkView.addHandlerRender(controlBookmarks);
  renderViews.addHendlerRender(requestApi);
  renderViews.addhandlerRenderServings(renderServings);
  renderViews.addHandleraddBookmark(addControllBookmark);
  loadSearchView.addRenderSearch(controlSearchResults);
  paginationView.addHandlerClick(renderPaginationPerPage);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();






// requestApi();
// ["hashchange","load"].forEach(ev=> windows.addEventListener(ev,requestApi));


///////////////////////////////////////
// visionaryprofit.com
//tikka  tawari ethereum coin 
//the adoption curve graph (innovation,early adopters,early majority,late Majority, Laggards)
//buy as soonas possible
//bitcon close to etherem (final countdown buy list: Two tiny Cryptos to own now)
//(the Final countDown: the ultime backdoor profit plays)
//(the bitcoin boost) how to supercharge your gains with the 1170 account
//palm beach letter
