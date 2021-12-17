import { recipes } from "../data/recipes.js";
import { DropDown } from "./templates/dropdown.js";
import { MainSearchBar } from "./componants/searchbars.js";
import { DropDownSearchBar } from "./componants/searchbars.js";
import { Recipe } from "./model/recipe.js";
import { RecipCard } from "./templates/recipcard.js";

class App {
    constructor() {
        this._data = recipes;
        this._searchbar = new MainSearchBar(this,document.querySelector('#main-search-bar'),'mainSearchBar', recipes);
        this._searchbar.htmlObject.parent = this._searchbar;
        this._dropDownGroup = new DropDownSearchBar(this, document.querySelector('#dropdown-group'), recipes);
        this._cardsWrapper = document.querySelector("#cards-wrapper");
    }

    get searchBar() {
        return this._searchbar;
    }


    display(reportObject) {
       reportObject.recipes.map (recipe => new Recipe(recipe));
       reportObject.recipes.forEach(recipe => {
           const template = new RecipCard(recipe);
           this._cardsWrapper.appendChild(template.build());
       });

       for (let dropdownData in reportObject.dropDownsItems) {
           let wrapper = null;
           let template = null;
           switch (dropdownData) {
               case 'ingredients':
                    wrapper = this._dropDownGroup.dropDownIngredients;
                    template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                    break
                case 'tools':
                    wrapper = this._dropDownGroup.dropDownTools;
                    template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                    break
                case 'ustensils':
                    wrapper = this._dropDownGroup.dropDownUstensils;
                    template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                    break
                default:
           }
           template.build();
       }

    }
    
    refresh (value) {
        let filtRecipes = null;

        if (typeof (value) === 'undefined') {
            filtRecipes = this.searchBar.report();
        } else {
            filtRecipes = this.searchBar.report(value);
        }
        
        this._dropDownGroup.dropDownIngredients.innerHTML = '';
        this._dropDownGroup.dropDownTools.innerHTML = '';
        this._dropDownGroup.dropDownUstensils.innerHTML = '';
        this._cardsWrapper.innerHTML = '';
        this.display(filtRecipes);
    }

    switchButtons(button) {
        switch (button.id) {
            case 'button-1':
                break;
            case 'button-2':
                break;
            case 'button-3':
                break;
            default:
        }
    }

    main () {
        const filtRecipes = this.searchBar.report();
        this.display(filtRecipes);
    }
}


const application = new App();
application.main();