import perantView from "./perantView.js";

import previewView  from "./previewView.js";
import icons from "../../img/icons.svg";


 class renderResults extends perantView{
    _perentElement=document.querySelector(".results");
    _errorMessage="there was no result for your searched query, Please try again :-)";
    _message="";
     
s
_generateMarkup(){
      console.log(this._data);
  return this._data.map(result=>previewView.render(result,false)).join(""); 
   }
  

 }
 export default new renderResults();