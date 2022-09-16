class WebMenu extends HTMLElement {
  #initialMount = true;

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-menu");
      this.#initialMount = false;
    }
  }
}

export default WebMenu;