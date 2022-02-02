import {async} from "regenerator-runtime";
import { API_RES,results_Per_Page,KEY} from "./config.js";
// import {getJson,sendJson} from "./helpers.js";
import { AJAX } from "./helpers.js";


export const state={
    recipe:{},
    search:{
        query:"",
        results:[],
        resultsPerPage: results_Per_Page, 
        defaultPage:1
    }, 

    bookmarks:[]
}
const createRecipeObject=function(data){
    const {recipe}=data.data;
  return{
    id:recipe.id,
    title:recipe.title,
    publisher:recipe.publisher,
    sourceUrl:recipe.source_url,
    image:recipe.image_url,
    servings:recipe.servings,
    cookingTime:recipe.cooking_time,
    ingredients:recipe.ingredients,
...(recipe.key && {key:recipe.key})
    }
}

export const loadRecipe=async function(id){
    try {
        
        const data= await AJAX(`${API_RES}/${id}`)
        state.recipe=createRecipeObject(data);
        // const data= await res.json();
        // console.log(data);
        

        if(state.bookmarks.some(bookmark=>bookmark.id===id)){
            state.recipe.bookmarked=true;
        }else{
            state.recipe.bookmarked=false;

        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const loadSearch=async function(query){
    try {
        state.search.query=query;
        const data= await AJAX(`${API_RES}?search=${query}&key=${KEY}`);
        
        state.search.results=data.data.recipes.map(entry=>{
            return {
                id:entry.id,
                title:entry.title,
                publisher:entry.publisher,
                image:entry.image_url,
...(entry.key && {key:entry.key})

            };
        });
        state.search.defaultPage=1;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getPageData=function(page=state.search.defaultPage){
    const start=(page-1)* state.search.resultsPerPage;
    const end=page*state.search.resultsPerPage;

    return state.search.results.slice(start,end);
}
// loadSearch("pizza");
export const addRenderServings=function(newServings){
     state.recipe.ingredients.forEach(entry=>{
         entry.quantity=(entry.quantity*newServings)/state.recipe.servings;
        //newQt=oldQt*newServings/oldSevings
    })
    state.recipe.servings=newServings;
}
const persistBookmark=function(){
    localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks))
}
export const addBookmark=function(recipe){
    //add bookmark
    state.bookmarks.push(recipe);

    //mark currrent recipe as bookmark
    if(recipe.id ===state.recipe.id)state.recipe.bookmarked=true;
    persistBookmark()
}


export const deleteBoobmark=function(id){
    //delete bookmark
    const index=state.bookmarks.findIndex(el=>el.id===id )
state.bookmarks.splice(index,1);
//marked as not bookmarked
if(id==state.recipe.id)state.recipe.bookmarked=false;
}
const init=function(){
const storage=localStorage.getItem("bookmarks");
console.log(storage);
if(storage)state.bookmarks=JSON.parse(storage);
}
init();

const clearBookmarks=function(){
    localStorage.clear("bookmarks");
}

// clearBookmarks();

export const uplaodRecipe=async function(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe)
        .filter(
        entry => entry[0].startsWith('ingredient') && entry[1] !== ''
        ).map(ing=>{
           
            const ingArr=ing[1].split(",").map(el=>el.trim());
            if(ingArr.length!==3){
                throw new Error ("Wrong ingrediant formant,please use correct format :)")
            }
            const[quantity,unit,discription]=ingArr;
            console.log({quantity,unit,discription});
    console.log();
            return {quantity:quantity?+quantity:null,unit,discription};
        });
        const recipe={
            title:newRecipe.title,
            source_url:newRecipe.sourceUrl,
            image_url:newRecipe.image,
            publisher:newRecipe.publisher,
            cooking_time:+newRecipe.cookingTime,
            servings:+newRecipe.servings,
            ingredients,
        }
        console.log(recipe);
        debugger;
      const data=await AJAX(`${API_RES}?key=${KEY}`,recipe);
      state.recipe=createRecipeObject(data);
      addBookmark(state.recipe);
 }          catch(err){
            throw err;
         //  console.log(ingredients);
}
}; 

