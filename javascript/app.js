import { recipes } from "../data/recipes.js";
import { DropDown } from "./templates/dropdown.js";
import { TagButton } from "./templates/tagbutton.js";
import { ErrorMessage } from "./templates/errormessage.js";
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
        this._html = document.querySelector('.container');
        this._html.addEventListener('click', this.resetDropDowns);
    }

    get searchBar() {
        return this._searchbar;
    }

    /* displayCards 
    arguments :
        reportObject - object
    abastract :
        for each recipe found, a Recipe object is created in order to print Recipes cards with a template */
 
    displayCards(reportObject) {
        this._cardsWrapper.innerHTML = '';
        reportObject.recipes.map (recipe => new Recipe(recipe));
        reportObject.recipes.forEach(recipe => {
            const template = new RecipCard(recipe);
            this._cardsWrapper.appendChild(template.build());
        });
    }

    /* displayDropDowns 
    arguments :
        reportObject - object
    abastract :
        for each drop down tags lists found, matching drop downs are build with list and a template */

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

    /* displayTag 
    arguments :
        tagName - string
        searchBarHtmlName - string
    abastract :
    displays a tag button with a tag name and a template
    uses searchBarHtmlName to select right button color*/

    displayTag(tagName, searchBarHtmlName) {
        let buttonColorClass = '';

        switch(searchBarHtmlName) {
            case 'input-ingredient':
                buttonColorClass = 'bg-blue';
                break;
            case 'input-tool':
                buttonColorClass = 'bg-light-green';
                break;
            case 'input-ustensil':
                buttonColorClass = 'bg-light-red';
                break;
            default:
        }

        const styles = {bgColor: buttonColorClass, fontColor: 'font-color-white'}

        const wrapper = document.querySelector('#tags-wrapper');
        const template = new TagButton(this, tagName, styles ,wrapper);
        template.build();
    }

    /* displayErrorMessage 
    arguments :
        void
    abastract :
        launches the error message when no recipe has been found*/

    displayErrorMessage(errorMessage) {
        this._cardsWrapper.innerHTML = '';
        const template = new ErrorMessage(errorMessage);
        this._cardsWrapper.appendChild(template.build());
    }

    /* deleteTag 
    arguments :
        tag - object
    abastract :
        deletes tag from tag list by a removeChild function
        removes the tag from the drop dow group active tags array
        refreshes with buttons linked to tags if remains tags in the active tags array
        Or refresh from the main search bar for reset filters and display all recipes */

    deleteTag(tag) {
        document.querySelector('#tags-wrapper').removeChild(tag);
        this._dropDownGroup.removeActiveTag(tag.innerText);
        
        if (this._dropDownGroup.activeTags.length > 0) {
            this._dropDownGroup.setFiltData(this._dropDownGroup.data);
            this._dropDownGroup.activeTags.forEach(tag => {
                this.refreshFromMenuButton(tag.buttObj);
            });

        } else {
            const searchBar = document.querySelector('#main-search-bar');
            this.refreshFromSearchBars(null, searchBar);
        }
    }
    
    /* refreshFromSearchBars 
    arguments :
        searchBarHtmlValue - string
        searchBarHtml - object
    abastract :
    */

    refreshFromSearchBars (searchBarHtmlValue, searchBarHtml) {
        const searchBarhtmlName = searchBarHtml.id;
        const searchBar = searchBarHtml.parent;
        let filtRecipes = null;

        if (searchBarHtmlValue === null) {
            filtRecipes = searchBar.report(null, searchBarhtmlName);
        } else {
            filtRecipes = searchBar.report(searchBarHtmlValue, searchBarhtmlName);
        }

        if (filtRecipes.recipes[0] != false) {

            /* reset the cards wrapper justify content if necessary */
            if (this._cardsWrapper.classList.contains('justify-content-center')) {
                this._cardsWrapper.classList.remove('justify-content-center');
                this._cardsWrapper.classList.add('justify-content-between', 'row-cols-md-3');
            }

            if (searchBarhtmlName === 'main-search-bar') {
                this._dropDownGroup.setFiltData(filtRecipes.recipes);
                this.displayCards(filtRecipes);
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-ingredient') {
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-tool') {
                this.displayDropDowns(filtRecipes);
            } else if (searchBarhtmlName === 'input-ustensil') {
                this.displayDropDowns(filtRecipes);
            }
                
        } else {
            /* change cards wrapper justify content to center the error message */
            if (this._cardsWrapper.classList.contains('justify-content-between')) {
                this._cardsWrapper.classList.remove('justify-content-between', 'row-cols-md-3');
                this._cardsWrapper.classList.add('justify-content-center');
            }
            const  errorMessage = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson »';
            this.displayErrorMessage(errorMessage);
        }
    }

    /* refreshFromSearchBars 
    arguments :
        button - object
    abastract :
    */

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
        this._dropDownGroup.setFiltData(filtRecipes.recipes);

        if (!this._dropDownGroup.isInObjects(buttonValue, this._dropDownGroup.activeTags, 'tagName')) {
            this.displayTag(buttonValue, searchBarHtmlName);
            this._dropDownGroup.addActiveTags({tagName: buttonValue, origin: searchBarHtmlName, buttObj: button});
        }
    }

    /* switchButtons 
    arguments :
        button - object
    abastract :
    */


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

    resetDropDowns(event) {
        if (event.explicitOriginalTarget.nodeName != 'BUTTON' && event.explicitOriginalTarget.nodeName != 'INPUT' && event.explicitOriginalTarget.nodeName != 'IMG') {
            const buttonsIds = [{id: '#button-1', dropdownId: '#dropdown-ingredients'}, 
                            {id:'#button-2', dropdownId: '#dropdown-tools'}, 
                            {id: '#button-3', dropdownId: '#dropdown-ustensils'}];

            for (let i = 0; i < buttonsIds.length; i++) {
                const button = document.querySelector(buttonsIds[i].id);
                const dropDown = button.parentElement.querySelector(buttonsIds[i].dropdownId);
                if (button.classList.contains('d-none')) {
                    button.classList.remove('d-none');
                }

                if (!dropDown.classList.contains('d-none')){
                    dropDown.classList.add('d-none');
                }
            }
        }
    }

    /* main 
    arguments :
       void
    abastract :
        launches the main page display
    */

    main () {
        const filtRecipes = this.searchBar.report(undefined, 'main-search-bar');
        this.displayCards(filtRecipes);
        this.displayDropDowns(filtRecipes);
    }
}


const application = new App();
application.main();