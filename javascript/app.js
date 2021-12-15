import { recipes } from "../data/recipes.js";
import { SearchBar } from "./componants/searchbar.js";
import { DropDownSearchBar } from "./componants/dropdownsearch.js";
import { Recipe } from "./model/recipe.js";
import { RecipCard } from "./templates/recipcard.js";

class App {
    constructor() {
        this._data = recipes;
        this._searchbar = new SearchBar(this,document.querySelector('#main-search-bar'),'mainSearchBar', recipes);
        this._dropDownIngredients = new DropDownSearchBar(this, document.querySelector('#dropdown-ingredients'), "ingredients", recipes);
        this._cardsWrapper = document.querySelector("#cards-wrapper");
    }

    main () {
        const recipesArr = [...this._data];
        recipesArr.map(recipe => new Recipe(recipe))
        recipesArr.forEach(recipe => {
            const template = new RecipCard(recipe);
            this._cardsWrapper.appendChild(template.build());
        });
    }

    get searchBar() {
        return this._searchbar;
    }

}


const application = new App();
application.main();