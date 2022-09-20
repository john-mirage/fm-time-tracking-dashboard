import WebActivityList from "@components/web-activity-list/web-activity-list";
import WebMenu from "@components/web-menu/web-menu";

class WebApp extends HTMLElement {
  [key: string]: any;
  #initialMount = true;
  webMenu: WebMenu;
  webActivityList: WebActivityList;

  static get observedAttributes() {
    return ["data-period"];
  }

  constructor() {
    super();
    this.webMenu = <WebMenu>this.querySelector('[data-id="web-menu"]');
    this.webActivityList = <WebActivityList>this.querySelector('[data-id="web-activity-list"]');
    this.handlePeriodUpdate = this.handlePeriodUpdate.bind(this);
    this.handlePeriodHasBeenUpdated = this.handlePeriodHasBeenUpdated.bind(this);
  }

  get period(): string | undefined {
    return this.dataset.period;
  }

  set period(newPeriod: string | undefined) {
    if (newPeriod) {
      this.dataset.period = newPeriod;
    } else {
      delete this.dataset.period;
    }
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-app");
      this.#initialMount = false;
    }
    this.addEventListener("update-period", this.handlePeriodUpdate);
    this.addEventListener("period-has-been-updated", this.handlePeriodHasBeenUpdated);
  }

  disconnectedCallback() {
    this.removeEventListener("update-period", this.handlePeriodUpdate);
    this.removeEventListener("period-has-been-updated", this.handlePeriodHasBeenUpdated);
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
        this.webActivityList.period = newValue !== null ? newValue : undefined;
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  handlePeriodUpdate(customEvent: Event) {
    const { period } = (<CustomEvent>customEvent).detail;
    this.period = period;
  }

  handlePeriodHasBeenUpdated() {
    this.webMenu.enableButtons();
  }
}

export default WebApp;