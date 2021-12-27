import { recipes } from "../data/recipes.js";
import { DropDown } from "./templates/dropdown.js";
import { MainSearchBar, SearchBar } from "./componants/searchbars.js";
import { DropDownSearchBar } from "./componants/searchbars.js";
import { Recipe } from "./model/recipe.js";
import { RecipCard } from "./templates/recipcard.js";

class App {
    constructor() {
        this._data = recipes;
        this._searchbar = new MainSearchBar(this,document.querySelector('#main-search-bar'),'mainSearchBar', recipes);
        this._searchbar.htmlObject.parent = this._searchbar;
        this._dropDownGroup = new DropDownSearchBar(this, document.querySelector('#dropdown-group'), 'dropDownGroup' ,recipes);
        this._cardsWrapper = document.querySelector("#cards-wrapper");
        this._filtDatas = null;
    }

    get searchBar() {
        return this._searchbar;
    }


    displayCards(reportObject) {
        this._cardsWrapper.innerHTML = '';
        reportObject.recipes.map (recipe => new Recipe(recipe));
        reportObject.recipes.forEach(recipe => {
            const template = new RecipCard(recipe);
            this._cardsWrapper.appendChild(template.build());
        });
    }

    displayDropDowns(reportObject) {
        for (let dropdownData in reportObject.dropDownsItems) {
            let wrapper = null;
            let template = null;
            switch (dropdownData) {
                case 'ingredients':
                    this._dropDownGroup.dropDownIngredients.querySelector('.dropdown-menu').innerHTML = '';
                     wrapper = this._dropDownGroup.dropDownIngredients.querySelector('.dropdown-menu');
                     template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                     break
                 case 'tools':
                    this._dropDownGroup.dropDownTools.querySelector('.dropdown-menu').innerHTML = '';
                     wrapper = this._dropDownGroup.dropDownTools.querySelector('.dropdown-menu');
                     template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                     break
                 case 'ustensils':
                    this._dropDownGroup.dropDownUstensils.querySelector('.dropdown-menu').innerHTML = '';
                     wrapper = this._dropDownGroup.dropDownUstensils.querySelector('.dropdown-menu');
                     template = new DropDown(reportObject.dropDownsItems[dropdownData], wrapper);
                     break
                 default:
            }
            template.build();
        }
    }
    
    refreshFromSearchBars (searchBarHtmlValue, searchBarHtml) {
        const searchBarhtmlName = searchBarHtml.id;
        const searchBar = searchBarHtml.parent;
        let filtRecipes = null;

        if (searchBarHtmlValue === null) {
            filtRecipes = searchBar.report(null, searchBarhtmlName);
        } else {
            filtRecipes = searchBar.report(searchBarHtmlValue, searchBarhtmlName);
        }

        if (filtRecipes.recipes[0] != 'no recipe found') {
            if (searchBarhtmlName === 'main-search-bar') {
                this._dropDownGroup.setData(filtRecipes.recipes);
                this.displayCards(filtRecipes);
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-ingredient') {
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-tool') {
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-ustensil') {
                this.displayDropDowns(filtRecipes);
            }
                
        }
    }

    refreshFromMenuButton(button) {
        const buttonValue = button.innerText;
        const searchbarHtml = button.searchbarhtml;
        const searchBarHtmlName = searchbarHtml.id;
        const searchBar = searchbarHtml.parent;

        let filtRecipes = null;
        filtRecipes = searchBar.getFiltRecipesAndTags(buttonValue, searchBarHtmlName);
        this._cardsWrapper.innerHTML = '';
        this.displayCards(filtRecipes);
        this.displayDropDowns(filtRecipes);
    }

    switchButtons(button) {
        let dropDown = null;
        const othersDropDownButtons = [];
        switch (button.id) {
            case 'button-1':
                dropDown = button.parentElement.querySelector('#dropdown-ingredients');
                othersDropDownButtons.push([button.parentElement.querySelector('#dropdown-tools'), 
                button.parentElement.querySelector('#button-2')], [button.parentElement.querySelector('#dropdown-ustensils'),
                button.parentElement.querySelector('#button-3')]);
                break;
            case 'button-2':
                dropDown = button.parentElement.querySelector('#dropdown-tools');
                othersDropDownButtons.push([button.parentElement.querySelector('#dropdown-ingredients'), 
                button.parentElement.querySelector('#button-1')], [button.parentElement.querySelector('#dropdown-ustensils'),
                button.parentElement.querySelector('#button-3')]);
                break;
            case 'button-3':
                dropDown = button.parentElement.querySelector('#dropdown-ustensils');
                othersDropDownButtons.push([button.parentElement.querySelector('#dropdown-ingredients'), 
                button.parentElement.querySelector('#button-1')], [button.parentElement.querySelector('#dropdown-tools'),
                button.parentElement.querySelector('#button-2')]);
                break;
            default:
        }
        button.classList.add('d-none');
        dropDown.classList.remove('d-none');

        for (let i=0; i < othersDropDownButtons.length; i++) {
            const otherDropDown =  othersDropDownButtons[i][0];
            const otherButton = othersDropDownButtons[i][1];
            if (!otherDropDown.classList.contains('d-none')){
                otherDropDown.classList.add('d-none')
            }

            if (otherButton.classList.contains('d-none')) {
                otherButton.classList.remove('d-none');
            }
        }

        
    }

    main () {
        const filtRecipes = this.searchBar.report(undefined, 'main-search-bar');
        this.displayCards(filtRecipes);
        this.displayDropDowns(filtRecipes);
    }
}


const application = new App();
application.main();