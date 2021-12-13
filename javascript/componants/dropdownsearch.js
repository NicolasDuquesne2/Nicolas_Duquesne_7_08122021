export class DropDownSearchBar {
    constructor(parent, htmlObject, name) {
        this._parent = parent;
        this._htmlObject = htmlObject;
        this._name = name;
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