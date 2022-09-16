class WebMenu extends HTMLElement {
  [key: string]: any;
  #initialMount = true;
  buttonElements: NodeListOf<HTMLButtonElement>;

  static get observedAttributes() {
    return ["data-period"];
  }

  constructor() {
    super();
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

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-menu");
      this.#initialMount = false;
    }
    this.upgradeProperty("period");
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
          this.updateButtons();
          const customEvent = new CustomEvent("update-period", {
            bubbles: true,
            detail: { period: this.period }
          });
          this.dispatchEvent(customEvent);
        } else {
          this.disableButtons();
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  disableButtons() {
    this.buttonElements.forEach((buttonElement) => {
      if (!buttonElement.hasAttribute("disabled")) buttonElement.setAttribute("disabled", "");
    });
  }

  updateButtons() {
    this.buttonElements.forEach((buttonElement) => {
      const currentButtonIsActive = this.period === buttonElement.dataset.period;
      if (currentButtonIsActive) {
        if (!buttonElement.hasAttribute("disabled")) buttonElement.setAttribute("disabled", "");
      } else if (buttonElement.hasAttribute("disabled")) {
        buttonElement.removeAttribute("disabled");
      }
    });
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