export class RecipCard {
    constructor(recipe) {
        this._recipe = recipe;
    }

    build() {

        const wrapper = document.createElement('div');
        wrapper.classList.add('card', 'shadow-sm', 'mb-4');
        wrapper.style.maxWidth = '380px';

        let htmlCard = '';
        htmlCard += `   <img class="h-50" src="https://via.placeholder.com/150" alt="">
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-8">
                                    <p class="text-left normal-font">
                                        ${this._recipe.name}
                                    </p>
                                </div>
                                <div class="col normal-font">
                                    <p class="text-right">
                                        <img src="image/clockvect.svg" alt="temps préparation">
                                        <span class="font-weight-bolder">${this._recipe.time}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p class="text-left tiny-font">`;
        this._recipe.ingredients.forEach(element => {
            htmlCard += `<span class="font-weight-bolder">${element.ingredient} ${element.quantity ? ' : ' : ''} </span>${element.quantity ? String(element.quantity) : ''} ${element.unit ? element.unit : ''}<br>`;
        });
        htmlCard +=                 `</p>
                                </div>
                                <div class="col">
                                    <p class="text-left text-Roboto tiny-font lh-100 text-trunc">
                                        ${this._recipe.description}
                                    </p>
                                </div>
                            </div>
                        </div>`;
        
        wrapper.innerHTML = htmlCard;
        return wrapper;
    }
}