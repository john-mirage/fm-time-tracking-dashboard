class WebMenu extends HTMLElement {
  [key: string]: any;
  #initialMount = true;
  #spinnerElement = document.createElement("span");
  buttonElements: NodeListOf<HTMLButtonElement>;

  static get observedAttributes() {
    return ["data-period", "disabled"];
  }

  constructor() {
    super();
    this.#spinnerElement.classList.add("web-menu__button-spinner");
    this.buttonElements = <NodeListOf<HTMLButtonElement>>this.querySelectorAll('[data-id="period-button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get period(): string | undefined {
    return this.dataset.period;
  }

  set period(newPeriod: string | undefined) {
    if (typeof newPeriod === "string") {
      this.dataset.period = newPeriod;
    } else {
      delete this.dataset.period;
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-menu");
      this.#initialMount = false;
    }
    this.upgradeProperty("period");
    this.upgradeProperty("disabled");
    if (!this.period) this.disabled = true;
    this.buttonElements.forEach((buttonElement) => buttonElement.addEventListener("click", this.handleButtonClick));
  }

  disconnectedCallback(){
    this.buttonElements.forEach((buttonElement) => buttonElement.removeEventListener("click", this.handleButtonClick));
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-period":
        if (typeof newValue === "string") {
          this.disableButtons();
          this.sendPeriodChangeEvent();
        } else {
          this.disabled = true;
        }
        break;
      case "disabled":
        const isDisabled = newValue !== null;
        if (isDisabled) {
          this.disableButtons();
        } else {
          this.enableButtons();
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  disableButtons() {
    this.buttonElements.forEach((buttonElement) => {
      const currentButtonIsActive = this.period === buttonElement.dataset.period;
      if (currentButtonIsActive) {
        buttonElement.append(this.#spinnerElement);
        if (!buttonElement.classList.contains("web-menu__button--active")) {
          buttonElement.classList.add("web-menu__button--active");
        }
      } else if (buttonElement.classList.contains("web-menu__button--active")) {
        buttonElement.classList.remove("web-menu__button--active");
      }
      if (!buttonElement.hasAttribute("disabled")) buttonElement.setAttribute("disabled", "");
    });
  }

  enableButtons() {
    this.buttonElements.forEach((buttonElement) => {
      this.#spinnerElement.remove();
      const currentButtonIsActive = this.period === buttonElement.dataset.period;
      if (currentButtonIsActive) {
        if (!buttonElement.classList.contains("web-menu__button--active")) buttonElement.classList.add("web-menu__button--active");
        if (!buttonElement.hasAttribute("disabled")) buttonElement.setAttribute("disabled", "");
      } else {
        if (buttonElement.classList.contains("web-menu__button--active")) buttonElement.classList.remove("web-menu__button--active");
        if (buttonElement.hasAttribute("disabled")) buttonElement.removeAttribute("disabled");
      }
    });
  }

  sendPeriodChangeEvent() {
    const customEvent = new CustomEvent("update-period", {
      bubbles: true,
      detail: { period: this.period }
    });
    this.dispatchEvent(customEvent);
  }

  handleButtonClick(event: MouseEvent) {
    const period = (<HTMLButtonElement>event.target).dataset.period;
    if (typeof period === "string") {
      this.period = period;
    } else {
      throw new Error("The clicked button do not contain a data name attribute")
    }
  }
}

export default WebMenu;