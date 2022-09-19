import WebActivity from "@components/web-activity/web-activity";
import activities from "@data/activities.json";
import { gsap } from "gsap";

class WebActivityList extends HTMLUListElement {
  [key: string]: any;
  #initialMount = true;
  #webActivities?: WebActivity[];
  #activities?: AppData.Activity[];
  #webActivity = <WebActivity>document.createElement("li", { is: "web-activity" });
  #animationTimeline = gsap.timeline({
    onComplete: () => {
      console.log("finish")
      const customEvent = new CustomEvent("period-has-been-updated", { bubbles: true });
      this.dispatchEvent(customEvent);
    }
  });

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

  get webActivities(): WebActivity[] | undefined {
    return this.#webActivities;
  }

  set webActivities(newWebActivities: WebActivity[] | undefined) {
    this.#webActivities = newWebActivities;
    if (this.#webActivities) {
      this.replaceChildren(...this.#webActivities);
    } else {
      this.replaceChildren();
    }
  }

  get activities(): AppData.Activity[] | undefined {
    return this.#activities;
  }

  set activities(newActivities: AppData.Activity[] | undefined) {
    this.#activities = newActivities;
    if (this.#activities) {
      this.webActivities = this.#activities.map((activity) => {
        const webActivity = <WebActivity>this.#webActivity.cloneNode(true);
        webActivity.activity = activity;
        webActivity.period = this.period;
        webActivity.animationTimeline = this.#animationTimeline;
        return webActivity;
      });
    } else {
      this.webActivities = undefined;
    }
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-activity-list");
      this.#initialMount = false;
    }
    this.upgradeProperty("period");
    this.upgradeProperty("webActivities");
    this.upgradeProperty("activities");
    this.activities = activities;
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
        this.webActivities?.forEach((webActivity) => {
          webActivity.period = newValue ? newValue : undefined;
        });
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }
}

export default WebActivityList;