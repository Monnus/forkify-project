import icons from "../../img/icons.svg";

export default class perantView{
    _data;
    render(data,render=true){
      if(!data|| (Array.isArray(data) &&data.length===0))return this.renderError();
        this._data=data;
        const markup=this._generateMarkup();
       if(!render)return markup;  
        this._clean();
          this._perentElement.insertAdjacentHTML("afterbegin",markup);
   

    }
          _clean(){
            this._perentElement.innerHTML=" ";
           }
           
      
    update(data){
      this._data =data;
      const newMarkup=this._generateMarkup();
      const newDom=document.createRange().createContextualFragment(newMarkup);
      const newElement=Array.from(newDom.querySelectorAll("*"));
      const curElement=Array.from(this._perentElement.querySelectorAll("*"));

      newElement.forEach((newEl,i)=>{
       const curEl=curElement[i];
       //updata change text
      //  console.log(curEl,curEl.isEqualNode(newEl));
       if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
         curEl.textContent=newEl.textContent;
       }
     
        // Updates changed ATTRIBUES
        if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

renderError(message=this._errorMessage){
  console.log(this._errorMessage);
    const markup=`
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}!</p>
   </div> `;
   this._clean();
   this._perentElement.insertAdjacentHTML("afterbegin",markup);
   }
   renderMessage(message= this._message){
          const markup=`
          <div> class="Message>
              <div>
                  <svg>
                  <Use href="${icons}#icon-smile"></use>
                  </svg>
              </div>
          <p>${message}</p>'
          <div>
          `;
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }
 renderSpinner(){
  const markup=`
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> `;
            this._perentElement.innerHTML=" ";
            this._perentElement.insertAdjacentHTML("afterbegin",markup);

}
  
}