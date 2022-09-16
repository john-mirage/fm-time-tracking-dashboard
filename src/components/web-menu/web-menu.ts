class WebMenu extends HTMLElement {
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
    this.period = "day";
    this.buttonElements.forEach((buttonElement) => buttonElement.addEventListener("click", this.handleButtonClick));
  }

  disconnectedCallback(){
    this.buttonElements.forEach((buttonElement) => buttonElement.removeEventListener("click", this.handleButtonClick));
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-period":
        if (typeof newValue === "string") {
          this.updateButtons();
          this.sendPeriodUpdateEvent();
        } else {
          this.period = "day";
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  updateButtons() {
    this.buttonElements.forEach((buttonElement) => {
      const currentButtonIsActive = this.period === buttonElement.dataset.name;
      if (currentButtonIsActive) {
        if (!buttonElement.hasAttribute("disabled")) buttonElement.setAttribute("disabled", "");
      } else if (buttonElement.hasAttribute("disabled")) {
        buttonElement.removeAttribute("disabled");
      }
    });
  }

  sendPeriodUpdateEvent() {
    const customEvent = new CustomEvent("update-period", {
      bubbles: true,
      detail: { period: this.period }
    });
    this.dispatchEvent(customEvent);
  }

  handleButtonClick(event: MouseEvent) {
    const period = (<HTMLButtonElement>event.target).dataset.name;
    if (typeof period === "string") {
      this.period = period;
    } else {
      throw new Error("The clicked button do not contain a data name attribute")
    }
  }
}

export default WebMenu;