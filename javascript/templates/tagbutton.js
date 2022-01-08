export class TagButton {
    constructor(parent, tagName, styles ,wrapper) {
        this._parent = parent;
        this._tagName = tagName;
        this._wrapper = wrapper;
        this._styles = styles;
    }

    build() {
        const tagWrapper = document.createElement('div');
        tagWrapper.parent = this._parent;
        tagWrapper.innerText = this._tagName;
        tagWrapper.classList.add('pt-2', 'pb-2', 'pl-2', 'rounded', 'mr-2', this._styles.bgColor, this._styles.fontColor);
        const button = document.createElement('button');
        button.classList.add('btn', this._styles.bgColor, this._styles.fontColor);
        button.addEventListener('click', this.onClick);
        const innerImage = document.createElement('img');
        innerImage.src ='image/circlecrossvect.svg';
        button.appendChild(innerImage);
        tagWrapper.appendChild(button);
        this._wrapper.appendChild(tagWrapper);
    }

    onClick(event) {
        const tagButton = event.currentTarget;
        const tag = tagButton.parentElement;
        tag.parent.deleteTag(tag);
    }
}