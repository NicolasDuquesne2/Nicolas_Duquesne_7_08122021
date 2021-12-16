import { recipes } from "../data/recipes.js";
import { MainSearchBar } from "./componants/searchbars.js";
import { DropDownSearchBar } from "./componants/searchbars.js";
import { Recipe } from "./model/recipe.js";
import { RecipCard } from "./templates/recipcard.js";

class App {
    constructor() {
        this._data = recipes;
        this._searchbar = new MainSearchBar(this,document.querySelector('#main-search-bar'),'mainSearchBar', recipes);
        this._searchbar.htmlObject.addEventListener("keyup", this.onKeyUp);
        this._searchbar.htmlObject.parent = this._searchbar;
        this._dropDownIngredients = new DropDownSearchBar(this, document.querySelector('#dropdown-ingredients'), "ingredients", recipes);
        this._dropDownTools = new DropDownSearchBar(this, document.querySelector('#dropdown-tools'), 'tools', recipes);
        this._dropDownUstensiles = new DropDownSearchBar(this, document.querySelector('#dropdown-ustensiles'), 'tools', recipes);
        this._cardsWrapper = document.querySelector("#cards-wrapper");
    }

    get searchBar() {
        return this._searchbar;
    }


    display (data) {
        data.map(recipe => new Recipe(recipe));
        data.forEach(recipe => {
            const template = new RecipCard(recipe);
            this._cardsWrapper.appendChild(template.build());
        });
    }
querySelector
    
    refresh (value) {
        const filtRecipes = this.searchBar.report(value);
        this._dropDownIngredients._dropDownhtml.innerHTML = '';
        this._dropDownTools._dropDownhtml.innerHTML = '';
        this._dropDownUstensiles._dropDownhtml.innerHTML = '';
        this._cardsWrapper.innerHTML = '';
        console.log("display prêt à être mis à jour");
        //this.display(filtRecipes);
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
            searchBarHtml.parent.parent.refresh(searchBarHtml.value);
        }
    }
    

    main () {
        const recipesArr = [...this._data];
        this.display(recipesArr);
    }
}


const application = new App();
application.main();