class WebActivity extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #activity?: AppData.Activity;
  nameElement: HTMLHeadingElement;
  currentValueElement: HTMLSpanElement;
  previousPeriodElement: HTMLSpanElement;
  previousValueElement: HTMLSpanElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-activity");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.nameElement = <HTMLHeadingElement>this.#templateFragment.querySelector('[data-id="web-activity-name"]');
    this.currentValueElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-activity-current-value"]');
    this.previousPeriodElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-activity-previous-period"]');
    this.previousValueElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-activity-previous-value"]');
  }

  get activity(): AppData.Activity {
    if (this.#activity !== undefined) {
      return this.#activity;
    } else {
      throw new Error("The activity is not defined");
    }
  }

  set activity(newActivity: AppData.Activity) {
    this.#activity = newActivity;
    const activityName = this.#activity.name.replace(" ", "-").toLowerCase();
    this.classList.add(`web-activity--${activityName}`);
    this.nameElement.textContent = this.#activity.name;
    this.currentValueElement.textContent = `${String(this.#activity.timeframes.weekly.current)}${this.#activity.timeframes.weekly.current > 1 ? "hrs" : "hr"}`;
    this.previousValueElement.textContent = `${String(this.#activity.timeframes.weekly.previous)}${this.#activity.timeframes.weekly.previous > 1 ? "hrs" : "hr"}`;
    this.previousPeriodElement.textContent = "week";
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-activity");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("activity");
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}

export default WebActivity;