import WebActivity from "@components/web-activity/web-activity";
import activities from "@data/activities.json";

class WebActivityList extends HTMLUListElement {
  #initialMount = true;
  #webActivity = <WebActivity>document.createElement("li", { is: "web-activity" });

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-activity-list");
      this.#initialMount = false;
    }
    this.replaceChildren(
      ...activities.map((activity) => {
        const webActivity = <WebActivity>this.#webActivity.cloneNode(true);
        webActivity.activity = activity;
        return webActivity;
      })
    );
  }
}

export default WebActivityList;