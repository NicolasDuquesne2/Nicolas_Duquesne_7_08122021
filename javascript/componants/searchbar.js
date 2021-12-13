export class SearchBar {
    constructor(parent) {
        this._parent = parent;
    }

    get parent() {
        return this._parent;
    }

    onKeyUp(event) {
        const searchBar = event.target;
        if (searchBar.value.length > 2) {
            alert("on a 3 lettres minimum");
        }
    }
}