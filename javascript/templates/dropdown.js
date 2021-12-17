export class DropDown {
    constructor(data, wrapper) {
        this._tags = data;
        this._wrapper = wrapper
    }

    build() {

        this._tags.forEach(element => {
            const button = document.createElement('button');
            button.classList.add('dropdown-item');
            button.type = 'button';
            button.innerText = element;
            this._wrapper.appendChild(button);
        });
    }
}