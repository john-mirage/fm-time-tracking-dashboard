class WebApp extends HTMLElement {
  #initialMount = true;

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-app");
      this.#initialMount = false;
    }
  }
}

export default WebApp;