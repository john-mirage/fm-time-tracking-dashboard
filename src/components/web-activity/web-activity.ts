class WebActivity extends HTMLLIElement {
  #initialMount = true;

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-activity");
      this.#initialMount = false;
    }
  }
}

export default WebActivity;