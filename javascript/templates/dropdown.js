export class DropDown {
    constructor(data) {
        this._tags = data;
    }

    build() {

        const wrapper = document.createElement('div');
        wrapper.classList.add('dropdown-menu');
        let htmlButtons = '';
        data.forEach(element => {
            htmlButtons += `<button class="dropdown-item" type="button">${element}</button>`
        });
        wrapper.innerHTML = htmlButtons;
        return wrapper;
    }
}