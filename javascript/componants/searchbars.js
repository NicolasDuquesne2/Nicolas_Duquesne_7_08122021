export class SearchBar {
    constructor(parent, htmlObject, name, data) {
        this._parent = parent;
        this._htmlObject = htmlObject;
        this._name = name;
        this._data = data;
    }

    /* filter 
    arguments :
        value - string
        searchBarhtmlName - string
    output :
        recipesFiltArr - array
    abastract :
        For the main search bar, selects recipes whose name or description or one of ingredient 
        includes the value string argument.
        For each sub search bars (applience, ingredients, ustensils), checks in ingredients or in applience or in ustensils
        need the searchBarhtmlName to checkout in right recipe attribute
        on success, returns an array with recipes found
        if value is undefined - case where we need all recipes - returned array equales
        array functions filter & includes are used to get recipes */

    filter(value, searchBarhtmlName, array) {
        let recipesFiltArr = [];

        if (value != null) {
               if(searchBarhtmlName === 'main-search-bar') {
                   recipesFiltArr = array.filter(element => {
                       return element.name.toLowerCase().includes(value.toLowerCase()) 
                       || element.description.toLowerCase().includes(value.toLowerCase()) 
                       || element.ingredients.filter(ingr => ingr.ingredient.toLowerCase().includes(value.toLowerCase())).length >0 ;
                   });
               } else if (searchBarhtmlName === 'input-ingredient') {
                   recipesFiltArr = array.filter(element => element.ingredients.filter(ingr => ingr.ingredient.toLowerCase().includes(value.toLowerCase())).length > 0);
               } else if (searchBarhtmlName === 'input-tool') {
                   recipesFiltArr = array.filter(element => element.appliance.toLowerCase().includes(value.toLowerCase()));
               } else if (searchBarhtmlName === 'input-ustensil') {
                recipesFiltArr = array.filter(element => element.ustensils.map(str => str.toLowerCase()).includes(value.toLowerCase()));
               }
        } else {
            recipesFiltArr = array;
        }

        return recipesFiltArr;
    }


    /* getDropDownsDatas 
    arguments :
        data - array
    abastract :
       Uses Array.from() to get unique arrays elements*/

    getDropDownsDatas(data) {  
        let ingredientsDatas = [];
        let toolsDatas = [];
        let ustensilesDatas = [];  
        let dropDownsDatasObj = {};

        data.forEach(element => {
            ingredientsDatas = Array.from(new Set(ingredientsDatas.concat(...element.ingredients.map(ingr => ingr.ingredient))));
            toolsDatas = Array.from(new Set(toolsDatas.concat(element.appliance)));
            ustensilesDatas = Array.from(new Set(ustensilesDatas.concat(...element.ustensils)));
        });

        dropDownsDatasObj.ingredients = ingredientsDatas;
        dropDownsDatasObj.tools = toolsDatas;
        dropDownsDatasObj.ustensils = ustensilesDatas;

        return dropDownsDatasObj;
    }
}

/* Class MainSearchBar */


export class MainSearchBar extends SearchBar {
    constructor(parent, htmlObject, name, data) {
        super(parent, htmlObject, name, data);
        this._htmlObject.addEventListener("keyup", this.onKeyUp);
    }

    get parent() {
        return this._parent;
    }

    get htmlObject() {
        return this._htmlObject;
    }

    get name () {
        return this._name;
    }

    /* filter 
    arguments :
        value - string
    abastract :
        selects recipes whose name or description or one of ingredient includes the value string argument.
        on success, returns an array with recipes found
        on failure returns an array with an error message */

    filter(value, searchBarhtmlName, array) {
        return super.filter(value, searchBarhtmlName, array);
    }

    /* getDropDownsDatas 
    arguments :
        data - array
    abastract :
        loops in each recipe ingredients to get ingredients, applience and ustencils in separated arrays
        then call the function getUniqueArray to eliminate duplicates from each arrays 
        then returns an object*/
    
    getDropDownsDatas(data) {
        return super.getDropDownsDatas (data);
    }

    report(value, searchBarhtmlName) { 
        const filtRecipes = super.filter(value, searchBarhtmlName, this._data);
        let dropDownsDatas = this.getDropDownsDatas(filtRecipes);
        return {recipes: filtRecipes, dropDownsItems: dropDownsDatas};
    }

    /* onKeyUp 
    arguments :
        event - object event
    abastract :
        Tests if the html object has a string length greater than 2.
        If true, launches the update process */

    onKeyUp(event) {
        const searchBarHtml = event.target;
        if (searchBarHtml.value.length > 2) {
            searchBarHtml.parent.parent.refreshFromSearchBars(searchBarHtml.value, searchBarHtml);
        } else {
            searchBarHtml.parent.parent.refreshFromSearchBars(null, searchBarHtml);
        }
    }

}

/* Class DropDownSearchBar */

export class DropDownSearchBar extends SearchBar {
    constructor(parent, htmlObject, name,data) {
        super(parent, htmlObject, name, data);
        this._filtDatas = this._data;
        this._activeTags = [];
        this._dropDownIngredients = this._htmlObject.querySelector('#dropdown-ingredients');
        this._dropDownIngredients.parent = this;
        this._dropDownTools = this._htmlObject.querySelector('#dropdown-tools');
        this._dropDownTools.parent = this;
        this._dropDownUstensils = this._htmlObject.querySelector('#dropdown-ustensils');
        this._dropDownUstensils.parent = this;
        this._ingredientsButt = this._htmlObject.querySelector('#button-1');
        this._ingredientsButt.parent = this;
        this._ingredientsButt.addEventListener('click',  this.onDropDownClick);
        this._toolsButt = this._htmlObject.querySelector('#button-2');
        this._toolsButt.parent = this;
        this._toolsButt.addEventListener('click',  this.onDropDownClick);
        this._ustensilsButt = this._htmlObject.querySelector('#button-3');
        this._ustensilsButt.parent = this;
        this._ustensilsButt.addEventListener('click',  this.onDropDownClick);
        this._searchIngredients = this._htmlObject.querySelector('#input-ingredient');
        this._searchIngredients.addEventListener('keyup', this.onKeyUp);
        this._searchIngredients.parent = this;
        this._searchTools = this._htmlObject.querySelector('#input-tool');
        this._searchTools.addEventListener('keyup', this.onKeyUp);
        this._searchTools.parent = this;
        this._searchUstensils = this._htmlObject.querySelector('#input-ustensil');
        this._searchUstensils.addEventListener('keyup', this.onKeyUp);
        this._searchUstensils.parent = this;
    }

    get parent() {
        return this._parent;
    }

    get htmlObject() {
        return this._htmlObject;
    }

    get name () {
        return this._name;
    }

    get dropDownhtml() {
        return this._dropDownhtml;
    }

    get ingredientsButt() {
        return this._ingredientsButt;
    }

    get toolsButt() {
        return this._toolsButt;
    }

    get ustensilsButt() {
        return this._ustensilsButt;
    }

    get dropDownIngredients() {
        return this._dropDownIngredients;
    }

    get dropDownTools() {
        return this._dropDownTools;
    }

    get dropDownUstensils() {
        return this._dropDownUstensils;
    }

    get activeTags() {
        return this._activeTags;
    }

    get data() {
        return this._data;
    }

    setFiltData(datas) {
        this._filtDatas = datas;
    }


    /* isInObjects
    arguments :
        value - string or digit or bool
        array - array of objects
        attr - attribute where value is checked
    abastract :
        loops in the array to check with the attribute value targeted. 
        Leaves the for statement when the value is found in the array and set the bool on true */

    isInObjects(value, array, attr) {
        let isIn = false;
        array.filter(object => object[attr].toLowerCase().includes(value.toLowerCase())).length > 0 ? isIn = true: isIn = false; 
        return isIn;
    }

    /* addActiveTags
    arguments :
        tagValue - string
    abastract :
        adds an active tag in the active tags list
    */

    addActiveTags(tagValue) {
        this._activeTags.push(tagValue);
    }

    /* addActiveTags
    arguments :
        tagValue - string
    abastract :
        removes a tag from the tag list
    */

    removeActiveTag(tagValue) {
        for (let i = 0; i < this._activeTags.length; i++) {
            if (this._activeTags[i]['tagName'] === tagValue) {
                this._activeTags.splice(i, 1);
            }
        }
    }

    /* getUniqueInArray 
    arguments :
        data - array
    abastract :
    loops in the original array and check each unique datas array's value.
    if there is no value from the original array in the unique datas array then
    this value is pushed in the unique datas array*/

    getUniqueInArray(data) {
        return super.getUniqueInArray(data);
    }

    /* getDropDownDatas 
    arguments :
        data - array
        searchBarhtmlName - str
        checkValue
    output :
        dropDownsDatasObj - object
    abastract :
        loops in ingredients or in applience or in ustensils and extract matching tags with sub search bar value
        then call the function getUniqueArray to eliminate duplicates from each arrays 
        then returns an object*/

    getDropDownDatas(data, searchBarhtmlName, checkValue) {
        let transitArray = [];
        let tagsArray = [];
        let dropDownsDatasObj = {};

        if(searchBarhtmlName === 'input-ingredient') {
            data.forEach(element => {
                transitArray = Array.from(new Set(transitArray.concat(...element.ingredients.map(ingr => ingr.ingredient))));
            });
        } else if (searchBarhtmlName === 'input-tool') {
            data.forEach(element => {
                transitArray = Array.from(new Set(transitArray.concat(element.appliance)));
            });
        } else if (searchBarhtmlName === 'input-ustensil') {
            data.forEach(element => {
                transitArray = Array.from(new Set(transitArray.concat(...element.ustensils)));
            });
        } 

        tagsArray = transitArray.filter(ingr => {
            if (ingr.toLowerCase().includes(checkValue.toLowerCase())) {
                return ingr;
            }
        });

        switch (searchBarhtmlName) {
            case 'input-ingredient':
                dropDownsDatasObj = {ingredients: tagsArray};
                break;
            case 'input-tool':
                dropDownsDatasObj = {tools: tagsArray};
                break;
            case 'input-ustensil':
                dropDownsDatasObj = {ustensils: tagsArray};
                break;
            default:
        }

        return dropDownsDatasObj;
    }

    /* getDropDownsDatas 
    arguments :
        data - array
        searchBarhtmlName - str
    output :
        dropDownsDatasObj - object
    abastract :
        loops in each recipe ingredients to get ingredients, applience and ustencils in separated arrays
        then call the function getUniqueArray to eliminate duplicates from each arrays 
        then returns an object*/
    
    getDropDownsDatas(data) {
        return super.getDropDownsDatas(data);
    }

    /* filter 
    arguments :
        value - string
    abastract :
        selects recipes whose name or description or one of ingredient includes the value string argument.
        on success, returns an array with recipes found
        on failure returns an array with an error message 
        if value is undefined - case where we need all recipes - returned array equales */

    filter(value, searchBarhtmlName, array) {
        return super.filter(value, searchBarhtmlName, array);
    }


    report(value, searchBarhtmlName) { 
        const filtRecipes = super.filter(value, searchBarhtmlName, this._data);
        let dropDownDatas = this.getDropDownDatas(filtRecipes, searchBarhtmlName, value);
        return {recipes: filtRecipes, dropDownsItems: dropDownDatas};
    }


    

    getFiltRecipesAndTags(value, searchBarhtmlName) {
        const filtRecipes = super.filter(value, searchBarhtmlName, this._filtDatas);
        let dropDownsDatas = this.getDropDownsDatas(filtRecipes);
        return {recipes: filtRecipes, dropDownsItems: dropDownsDatas};

    }

    /* onKeyUp 
    arguments :
        event - object event
    abastract :
        Tests if the html object has a string length greater than 2.
        If true, launches the update process */

    onKeyUp(event) {
        const searchBarHtml = event.target;
        searchBarHtml.parent.parent.refreshFromSearchBars(searchBarHtml.value, searchBarHtml);
    }
    
    /* onDropDownClick
    arguments :
        event - event object
    abstract :
        fires on dropdown buttons ingredients, appliance or ustensil. Launches the
        switching button group controller function. replace this button by a couple search bar & dropdown menu. 
     */

    onDropDownClick(event) {
        const button = event.currentTarget;
        button.parent.parent.switchButtons(button);
    }

     /* onDropDownMenuClick
    arguments :
        event - event object
    abstract :
        fires on menu element. allow to display a tag button 
        and recipes matching with the button's string value selected. 
     */

    onDropDownMenuClick(event) {
        const button = event.currentTarget;
        button.parent.parent.refreshFromMenuButton(button);
    }
}