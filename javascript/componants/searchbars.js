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
    abastract :
        selects recipes whose name or description or one of ingredient includes the value string argument.
        on success, returns an array with recipes found
        on failure returns an array with an error message */

        filter(value) {
            const recipesFiltArr = [];
            const pattern = new RegExp(value, 'i');
    
            /* for all recipe */
            for (let recipe of this._data) {
                let filterValueMatches = [];
                /* loop in recipe attributes */
                for (let attribute in recipe) {
                    /* check in name, description & ingredients. feeds a boolean array and leaves the for loop when a true is pushed*/
                    if (attribute === 'name' || attribute === 'description') {
                        const match = recipe[attribute].match(pattern);
                            if (match) {
                                filterValueMatches.push(true);
                                break;
                            } else {
                                filterValueMatches.push(false);
                            }
                    } else if (attribute === 'ingredients') {
                        /* ingredients is an array */
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
    
            for (let recipe of data) {
                for (let attribute in recipe) {
                    switch (attribute) {
                        case 'ingredients':
                            for (let ingredient of recipe[attribute]) {
                                ingredientsDatas.push(ingredient.ingredient)
                            }
                            break;
                        case 'appliance':
                            toolsDatas.push(recipe[attribute])
                            break;
                        case 'ustensils':
                            for (let ustensil of recipe[attribute]) {
                                ustensilesDatas.push(ustensil);
                            }
                        default:
                    }
                }
            }
    
            const ingredientsArray = this.getUniqueInArray(ingredientsDatas);
            const toolsArray = this.getUniqueInArray(toolsDatas);
            const ustensilsArray = this.getUniqueInArray(ustensilesDatas)
            
            return { ingredients: ingredientsArray, tools: toolsArray, ustensils: ustensilsArray};
        }
    
        report(value) {
            const filtRecipes = this.filter(value);
            let dropDownsDatas = this.getDropDownsDatas(filtRecipes);
    
            for (let attribute in dropDownsDatas) {
                dropDownsDatas[attribute] = this.getUniqueInArray(dropDownsDatas[attribute]);
            }
    
            return {recipes: filtRecipes, dropDownsItems: dropDownsDatas};
        }
}


export class MainSearchBar extends SearchBar {
    constructor(parent, htmlObject, name, data) {
        super(parent, htmlObject, name, data);
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

    filter(value) {
        return super.filter(value);
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
       return super.getDropDownsDatas(data);
    }

    report(value) { 
        return super.report(value);
    }

}


export class DropDownSearchBar {
    constructor(parent, htmlObject, name, data) {
        this._parent = parent;
        this._htmlObject = htmlObject;
        this._dropDownhtml = this.htmlObject.querySelector('.dropdown-menu');
        this._name = name;
        this._data = data;
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

    onKeyUp(event) {
        const searchBar = event.target;
        if (searchBar.value.length > 2) {
            alert("on a 3 lettres minimum");
        }
    }    
}