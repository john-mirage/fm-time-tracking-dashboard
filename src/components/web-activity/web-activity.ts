class WebActivity extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #initialAnimation = true;
  #templateFragment: DocumentFragment;
  #activity?: AppData.Activity;
  #animationTimeline?: gsap.core.Timeline;
  nameElement: HTMLHeadingElement;
  bottomRowElement: HTMLDivElement;
  currentElement: HTMLParagraphElement;
  previousElement: HTMLParagraphElement;
  

  static get observedAttributes() {
    return ["data-period"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-activity");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.nameElement = <HTMLHeadingElement>this.#templateFragment.querySelector('[data-id="web-activity-name"]');
    this.bottomRowElement = <HTMLDivElement>this.#templateFragment.querySelector('[data-id="web-activity-bottom-row"]');
    this.currentElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-activity-current"]');
    this.previousElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-activity-previous"]');
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

  get animationTimeline(): gsap.core.Timeline | undefined {
    return this.#animationTimeline;
  }

  set animationTimeline(newAnimationTimeline: gsap.core.Timeline | undefined) {
    if (newAnimationTimeline) {
      this.#animationTimeline = newAnimationTimeline;
    } else {
      this.#animationTimeline = undefined;
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
    this.upgradeProperty("animationTimeline");
    this.animationTimeline?.from(this.bottomRowElement, {
      onComplete: () => { if (this.#animationTimeline) this.#initialAnimation = false; },
      opacity: 0,
      x: "2rem",
      duration: 1,
      ease: "power1",
      clearProps: "all",
    }, "initial");
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
        if (this.isConnected && !this.#initialAnimation) {
          this.animationTimeline?.restart();
        }
        if (typeof newValue === "string") { 
          const currentValue = this.activity.timeframes[newValue].current;
          const previousValue = this.activity.timeframes[newValue].previous;
          this.currentElement.textContent = `${String(currentValue)}${currentValue > 1 ? "hrs" : "hr"}`;
          this.previousElement.textContent = `Last ${newValue} - ${String(previousValue)}${previousValue > 1 ? "hrs" : "hr"}`;
        } else {
          this.currentElement.textContent = "";
          this.previousElement.textContent = "";
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }
}

export default WebActivity;