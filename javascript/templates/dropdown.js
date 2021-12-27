export class DropDown {
    constructor(data, wrapper) {
        this._tags = data;
        this._wrapper = wrapper
        this._dropDownParent = wrapper.parentElement.parentElement.parent;
    }

    build() {

        this._tags.forEach(element => {
            const button = document.createElement('button');
            button.classList.add('dropdown-item');
            button.type = 'button';
            button.innerText = element;
            button.addEventListener('click', this._dropDownParent.onDropDownMenuClick);
            button.parent = this._wrapper.parentElement.parentElement.parent;
            button.searchbarhtml = this._wrapper.parentElement.parentElement.querySelector('input');
            this._wrapper.appendChild(button);
        });
    }
}