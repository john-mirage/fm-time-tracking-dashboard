class WebActivityList extends HTMLUListElement {
  #initialMount = true;

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-activity-list");
      this.#initialMount = false;
    }
  }
}

export default WebActivityList;