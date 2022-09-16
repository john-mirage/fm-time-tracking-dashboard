import WebActivity from "@components/web-activity/web-activity";
import activities from "@data/activities.json";

class WebActivityList extends HTMLUListElement {
  [key: string]: any;
  #initialMount = true;
  #webActivity = <WebActivity>document.createElement("li", { is: "web-activity" });

  static get observedAttributes() {
    return ["data-period"];
  }

  constructor() {
    super();
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
      this.classList.add("web-activity-list");
      this.#initialMount = false;
    }
    this.upgradeProperty("period");
    this.replaceChildren(
      ...activities.map((activity) => {
        const webActivity = <WebActivity>this.#webActivity.cloneNode(true);
        webActivity.activity = activity;
        webActivity.period = this.period;
        return webActivity;
      })
    );
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
        if (this.children.length > 0) {
          const webActivities = <WebActivity[]>Array.from(this.children);
          console.log("web activity list period", webActivities);
          webActivities.forEach((webActivity) => {
            webActivity.period = newValue !== null ? newValue : undefined;
          });
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }
}

export default WebActivityList;