import "./main.css";

import WebApp from "@components/web-app/web-app";
import WebMenu from "@components/web-menu/web-menu";
import WebActivityList from "@components/web-activity-list/web-activity-list";
import WebActivity from "@components/web-activity/web-activity";

customElements.define("web-app", WebApp, { extends: "main" });
customElements.define("web-menu", WebMenu, { extends: "header" });
customElements.define("web-activity-list", WebActivityList, { extends: "ul" });
customElements.define("web-activity", WebActivity, { extends: "li" });

/*
interface Period {
  current: number;
  previous: number;
}

interface Stat {
  title: string;
  timeframes: {
    [period: string]: Period;
    daily: Period;
    weekly: Period;
    monthly: Period;
  }
}

class AppDashboard extends HTMLElement {
  activeButton: HTMLButtonElement | false;

  constructor() {
    super();
    this.activeButton = false;
  }

  connectedCallback() {
    this.classList.add("dashboard");
    this.createMenu();
    stats.forEach((stat: Stat) => this.createStat(stat));
  }

  setActiveButton(button: HTMLButtonElement) {
    if (this.activeButton) this.disableButton(this.activeButton);
    this.activeButton = button;
    this.activateButton(this.activeButton);
  }

  activateButton(button: HTMLButtonElement) {
    button.classList.add("menu__button--active");
    button.setAttribute("disabled", "");
  }

  disableButton(button: HTMLButtonElement) {
    button.classList.remove("menu__button--active");
    button.removeAttribute("disabled");
  }

  createMenu() {
    const template = <HTMLTemplateElement>document.getElementById("template-menu");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLElement>fragment.querySelector(".menu");
    const buttons = <NodeListOf<HTMLButtonElement>>fragment.querySelectorAll(".menu__button");
    this.setActiveButton(buttons[1]);
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.setActiveButton(button);
        const customEvent = new CustomEvent("change-period", { detail: {
            name: button.dataset.name,
            periodName: button.dataset.period
        }});
        this.dispatchEvent(customEvent);
      });
    });
    this.appendChild(element);
  }

  createStat(stat: Stat) {
    const template = <HTMLTemplateElement>document.getElementById("template-stat");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLElement>fragment.querySelector(".stat");
    const title = fragment.querySelector(".stat__title") as HTMLHeadingElement;
    const currentValue = fragment.querySelector(".stat__current-value") as HTMLSpanElement;
    const previousValue = fragment.querySelector(".stat__previous-value") as HTMLSpanElement;
    const previousPeriod = fragment.querySelector(".stat__previous-period") as HTMLSpanElement;
    const statName = stat.title.replace(" ", "-").toLowerCase();
    element.classList.add(`stat--${statName}`);
    title.textContent = stat.title;
    currentValue.textContent = `${String(stat.timeframes.weekly.current)}${stat.timeframes.weekly.current > 1 ? "hrs" : "hr"}`;
    previousValue.textContent = `${String(stat.timeframes.weekly.previous)}${stat.timeframes.weekly.previous > 1 ? "hrs" : "hr"}`;
    previousPeriod.textContent = "week";
    this.addEventListener("change-period", (event) => {
      const name: string = (<CustomEvent>event).detail.name;
      const periodName: string = (<CustomEvent>event).detail.periodName;
      const period = <Period>stat.timeframes[periodName];
      currentValue.textContent = `${String(period.current)}${period.current > 1 ? "hrs" : "hr"}`;
      previousValue.textContent = `${String(period.previous)}${period.previous > 1 ? "hrs" : "hr"}`;
      previousPeriod.textContent = name;
    });
    this.appendChild(element);
  }
}

customElements.define("app-dashboard", AppDashboard);
*/
