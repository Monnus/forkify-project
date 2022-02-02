
 class loadSearchView{
_perentElement=document.querySelector(".search");

        getQuery(){

       const query= this._perentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
        }
        _clearInput(){
                return this._perentElement.querySelector(".search__field").value=" ";
        }

        addRenderSearch(handler){
                this._perentElement.addEventListener("submit",function(e){
                        e.preventDefault();
                        handler();
                })
        }



}
export default new loadSearchView();