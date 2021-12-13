
class App {
    constructor() {
        this._data = recipes;
        this._wrapper = document.querySelector("#cards-wrapper");
    }

    main () {
        const recipesArr = [...this._data];
        recipesArr.map(recipe => new Recipe(recipe))
        recipesArr.forEach(recipe => {
            const template = new RecipCard(recipe);
            this._wrapper.appendChild(template.build());
        });
    }
}


const application = new App();
application.main();