export class ErrorMessage {
    constructor(message) {
        this._message = message;
    }

    build() {
        const wrapper = document.createElement('p');
        wrapper.classList.add('alert', 'alert-danger', 'shadow-sm', 'mb-4');
        wrapper.innerText = this._message;
        return wrapper;
    }

}
