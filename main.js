class ContactForm {
  /** @type {HTMLFormElement}*/
  #form = document.getElementById('contact-form');
  /** @type {HTMLInputElement} */
  #name = document.getElementById('name');
  /** @type {HTMLInputElement} */
  #email = document.getElementById('email');
  /** @type {HTMLTextAreaElement} */
  #message = document.getElementById('message');

  constructor() {
    this.#form.addEventListener('submit', this.#validate.bind(this));
  }

  /**
   * @param {Event} event
   * @return {void}
   */
  #validate(event) {
    const isValidName = this.#validateName();
    const isValidEmail = this.#validateEmail();
    const isValidMessage = this.#validateMessage();

    if (!isValidName || !isValidEmail || !isValidMessage) {
      event.preventDefault();
    }
  }

  /**
   * @return {void}
   */
  #validateEmail() {
    if (this.#email.value.trim() === '' || this.#email.validity.valueMissing) {
      this.#addErrorState(this.#email, 'Please enter an Email');
      return false;
    } else if (this.#email.validity.typeMismatch) {
      this.#addErrorState(this.#email, 'Sorry, invalid format here');
      return false;
    } else {
      this.#removeErrorState(this.#email);
      return true;
    }
  }

  /**
   * @return {boolean}
   */
  #validateName() {
    if (this.#name.value.trim() === '' || this.#name.validity.valueMissing) {
      this.#addErrorState(this.#name, 'Please enter a Name');
      return false;
    } else if (this.#name.validity.tooShort) {
      this.#addErrorState(this.#name, 'Name entered is too short');
      return false;
    } else if (this.#name.validity.tooLong) {
      this.#addErrorState(this.#name, 'Name entered is too long');
      return false;
    } else {
      this.#removeErrorState(this.#name);
      return true;
    }
  }

  /**
   * @return {boolean}
   */
  #validateMessage() {
    if (
      this.#message.value.trim() === '' ||
      this.#message.validity.valueMissing
    ) {
      this.#addErrorState(this.#message, 'Please enter a Message');
      return false;
    } else if (this.#message.validity.tooShort) {
      this.#addErrorState(this.#message, 'Message is too short');
      return false;
    } else if (this.#message.validity.tooLong) {
      this.#addErrorState(this.#message, 'Message is too long');
      return false;
    } else {
      this.#removeErrorState(this.#message);
      return true;
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement
   * @param {string} message
   * @return {void}
   */
  #addErrorState(formElement, message) {
    const errorMessageElement = formElement.nextElementSibling;

    formElement.setAttribute('aria-invalid', 'true');

    if (errorMessageElement instanceof HTMLElement) {
      errorMessageElement.innerText = message;
      errorMessageElement.removeAttribute('hidden');
    } else {
      return;
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement
   * @return {void}
   */
  #removeErrorState(formElement) {
    const errorMessageElement = formElement.nextElementSibling;

    formElement.setAttribute('aria-invalid', 'false');

    if (errorMessageElement instanceof HTMLElement) {
      errorMessageElement.innerText = '';
      errorMessageElement.setAttribute('hidden', 'hidden');
    } else {
      return;
    }
  }
}

new ContactForm();
