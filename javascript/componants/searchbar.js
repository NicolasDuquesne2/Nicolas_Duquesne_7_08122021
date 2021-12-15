
export class SearchBar {
    constructor(parent, htmlObject, name, data) {
        this._parent = parent;
        this._htmlObject = htmlObject;
        this._htmlObject.addEventListener("keyup", this.onKeyUp);
        this.htmlObject.parent = this;
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

    /* onKeyUp 
    arguments :
        event - object event
    abastract :
        Tests if the html object has a string length greater than 2.
        If true, launches the update process */

    onKeyUp(event) {
        const searchBar = event.target;
        if (searchBar.value.length > 2) {
            const filtResult = searchBar.parent.filter(searchBar.value);
            console.log(filtResult);
        }
    }

}