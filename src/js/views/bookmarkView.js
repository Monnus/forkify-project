import perantView from "./perantView.js";
import icons from "../../img/icons.svg";
import previewView  from "./previewView.js";

 class bookmarkView extends perantView{
    _perentElement=document.querySelector(".bookmarks__list");
    _errorMessage="No bookmarks yet. Find a nice recipe and bookmark it :)";
    _message="";
     
    addHandlerRender(handler){
    window.addEventListener("load",handler)
}
    _generateMarkup(){
    console.log(this._data);
return this._data.map(bookmarks=>previewView.render(bookmarks,false)).join(""); 
 }


 }
 export default new bookmarkView();