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
        on failure returns an array with an error message 
        if value is undefined - case where we need all recipes - returned array equales */

    filter(value, searchBarhtmlName) {
        let recipesFiltArr = [];
        const pattern = new RegExp(value, 'i');

        if (value != null) {
                /* for all recipe */
            for (let recipe of this._data) {
                let filterValueMatches = [];
                /* loop in recipe attributes */
                for (let attribute in recipe) {
                    /* check in name, description & ingredients for the main search bar.
                    ckecks in ingredients, appliance & ustensils for sub search bars(applience, ingredients, ustensils) 
                    .feeds a boolean array and leaves the for loop when a true is pushed*/
                    if (((attribute === 'name' || attribute === 'description') && searchBarhtmlName === 'main-search-bar') ||
                    (attribute === 'appliance' && searchBarhtmlName === 'input-tool')) {
                        const match = recipe[attribute].match(pattern);
                        if (match) {
                            filterValueMatches.push(true);
                            break;
                        } else {
                            filterValueMatches.push(false);
                        }
                    /* both main search bar and sub search bar ingredients check in ingredient array */
                    } else if (attribute === 'ingredients') {
                        /* ingredients is an array */
                        if (searchBarhtmlName === 'main-search-bar' || searchBarhtmlName === 'input-ingredient') {
                            for (let ingredient of recipe[attribute]) {
                                const str = ingredient.ingredient;
                                const match = str.match(pattern);
                                if (match){
                                    filterValueMatches.push(true);
                                    break;
                                } else {
                                    filterValueMatches.push(false);
                                }
                            }
                        }
                    } else if (attribute === 'ustensils' && searchBarhtmlName === 'input-ustensil') {
                        const ustensilsArr = recipe[attribute];
                        let string = '';
                        let match = null;
                        for (let i = 0; i < ustensilsArr.length; i++) {
                            string = ustensilsArr[i];
                            match = string.match(pattern);
                            if (match) {
                                filterValueMatches.push(true);
                                break;
                            } else {
                                filterValueMatches.push(false);
                            }
                        }
                    }
                }
                /* the recipe checked is pushed in the return array only if there is a true value in the boolean array */
                if (filterValueMatches.length > 0) {
                    for (let valueMatch of filterValueMatches) {
                        if (valueMatch === true) {
                            recipesFiltArr.push(recipe);
                            break;
                        }
                    }
                }
            }
    
            /* if the returned array is empty, a defaut error message is pushed */
            if (recipesFiltArr.length === 0) {
                recipesFiltArr.push("no recipe found");
            }
        } else {
            recipesFiltArr = this._data;
        }

        return recipesFiltArr
    }

        /* getUniqueInArray 
    arguments :
        data - array
    abastract :
        loops in the original array and check each unique datas array's value.
        if there is no value from the original array in the unique datas array then
        this value is pushed in the unique datas array*/

    getUniqueInArray(data) {
        const uniqueDatasArray = [];

        for (let i = 0; i < data.length; i++) {
            const pattern = new RegExp(data[i], 'i');
            let duplicate = false;
            for (let j = 0; j < uniqueDatasArray.length; j++) {
                const item = uniqueDatasArray[j]
                if (item.match(pattern)) {
                    duplicate = true;
                }
            }

            if (!duplicate) {
                uniqueDatasArray.push(data[i]);
            }
        }

        return uniqueDatasArray;
    }

    /* getDropDownsDatas 
    arguments :
        data - array
    abastract :
        loops in each recipe ingredients to get ingredients, applience and ustencils in separated arrays
        then call the function getUniqueArray to eliminate duplicates from each arrays 
        then returns an object*/

    getDropDownsDatas(data) {
        const ingredientsDatas = [];
        const toolsDatas = [];
        const ustensilesDatas = [];
        let ingredientsArray = [];
        let toolsArray = [];
        let ustensilsArray = [];
        let dropDownsDatasObj = null;

        for (let recipe of data) {
            for (let attribute in recipe) {

                if (attribute === 'ingredients') {
                    for (let ingredient of recipe[attribute]) {
                        ingredientsDatas.push(ingredient.ingredient)
                    }
                } else if (attribute === 'appliance') {
                    toolsDatas.push(recipe[attribute]);
                } else if (attribute === 'ustensils') {
                    for (let ustensil of recipe[attribute]) {
                        ustensilesDatas.push(ustensil);
                    }
                }
            }
        }

        ingredientsDatas.length > 0 ? ingredientsArray = this.getUniqueInArray(ingredientsDatas): ingredientsArray = null;
        toolsDatas.length > 0 ? toolsArray = this.getUniqueInArray(toolsDatas): toolsArray = null;
        ustensilesDatas.length > 0 ? ustensilsArray = this.getUniqueInArray(ustensilesDatas): ustensilsArray = null;
        dropDownsDatasObj =  { ingredients: ingredientsArray, tools: toolsArray, ustensils: ustensilsArray};

        return dropDownsDatasObj;
    }
}


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

    filter(value, searchBarhtmlName) {
        return super.filter(value, searchBarhtmlName);
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
        const filtRecipes = super.filter(value, searchBarhtmlName);
        let dropDownsDatas = this.getDropDownsDatas(filtRecipes);

        for (let attribute in dropDownsDatas) {
            dropDownsDatas[attribute] = super.getUniqueInArray(dropDownsDatas[attribute]);
        }

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


export class DropDownSearchBar extends SearchBar {
    constructor(parent, htmlObject, name,data) {
        super(parent, htmlObject, name, data);
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
        return this._ustensilsButt
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

    setData(datas) {
        this._data = datas;
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
        
        for(let i = 0; i < array.length; i++) {
            if (array[i][attr] === value) {
                isIn = true;
                break;
            }
        }
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
        const tagsArray = [];
        let tagsArrayRet = [];
        let dropDownsDatasObj = {};

        const pattern = new RegExp(checkValue, 'i');
        for (let i = 0; i < data.length; i++) {
            for (let attribute in data[i]) {
                if (attribute === 'ingredients' && searchBarhtmlName === 'input-ingredient') {
                    for (let ingredient of data[i][attribute]) {
                        if (ingredient.ingredient.match(pattern)) {
                            tagsArray.push(ingredient.ingredient)
                        }
                    }
                } else if (attribute === 'appliance' && searchBarhtmlName === 'input-tool') {
                    if (data[i][attribute].match(pattern)) {
                        tagsArray.push(data[i][attribute]);
                    }
                } else if (attribute === 'ustensils' && searchBarhtmlName === 'input-ustensil') {
                    for (let ustensil of data[i][attribute]) {
                        if (ustensil.match(pattern)){
                            tagsArray.push(ustensil);
                        }
                    }
                }
            }
        }
        
        tagsArray.length > 0 ? tagsArrayRet = this.getUniqueInArray(tagsArray): tagsArrayRet = null;

        switch (searchBarhtmlName) {
            case 'input-ingredient':
                dropDownsDatasObj = {ingredients: tagsArrayRet};
                break;
            case 'input-tool':
                dropDownsDatasObj = {tools: tagsArrayRet};
                break;
            case 'input-ustensil':
                dropDownsDatasObj = {ustensils: tagsArrayRet};
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

    filter(value, searchBarhtmlName) {
        return super.filter(value, searchBarhtmlName);
    }

    report(value, searchBarhtmlName) { 
        const filtRecipes = super.filter(value, searchBarhtmlName);


        let dropDownDatas = this.getDropDownDatas(filtRecipes, searchBarhtmlName, value);

        for (let attribute in dropDownDatas) {
            dropDownDatas[attribute] = super.getUniqueInArray(dropDownDatas[attribute]);
        }

        return {recipes: filtRecipes, dropDownsItems: dropDownDatas};
    }

    getFiltRecipesAndTags(value, searchBarhtmlName) {
        const filtRecipes = super.filter(value, searchBarhtmlName);
        let dropDownsDatas = this.getDropDownsDatas(filtRecipes);

        for (let attribute in dropDownsDatas) {
            dropDownsDatas[attribute] = super.getUniqueInArray(dropDownsDatas[attribute]);
        }

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