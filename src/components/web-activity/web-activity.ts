class WebActivity extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #activity?: AppData.Activity;
  nameElement: HTMLHeadingElement;
  currentValueElement: HTMLSpanElement;
  previousPeriodElement: HTMLSpanElement;
  previousValueElement: HTMLSpanElement;

  static get observedAttributes() {
    return ["data-period"];
  }

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
      this.classList.add("web-activity");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("activity");
    this.upgradeProperty("period");
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
        if (typeof newValue === "string") {
          const currentValue = this.activity.timeframes[newValue].current;
          const previousValue = this.activity.timeframes[newValue].previous
          this.currentValueElement.textContent = `${String(currentValue)}${currentValue > 1 ? "hrs" : "hr"}`;
          this.previousPeriodElement.textContent = newValue;
          this.previousValueElement.textContent = `${String(previousValue)}${previousValue > 1 ? "hrs" : "hr"}`;;
        } else {
          this.currentValueElement.textContent = "";
          this.previousPeriodElement.textContent = "";
          this.previousValueElement.textContent = "";
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }
}

export default WebActivity;