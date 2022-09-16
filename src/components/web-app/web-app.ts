class WebApp extends HTMLElement {
  #initialMount = true;

  constructor() {
    super();
    this.handlePeriodUpdate = this.handlePeriodUpdate.bind(this);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-app");
      this.#initialMount = false;
    }
    this.addEventListener("update-period", this.handlePeriodUpdate);
  }

  disconnectedCallback() {
    this.removeEventListener("update-period", this.handlePeriodUpdate);
  }

  handlePeriodUpdate(customEvent: Event) {
    const { period } = (<CustomEvent>customEvent).detail;
    console.log("period is now: ", period);
  }
}

export default WebApp;